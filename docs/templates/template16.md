---
id: template16
title: A 2
sidebar_label: A 2
slug: /templates/a2
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This contract implements the Application 2 (A 2) specification <Link to='https://gitlab.com/tzip/tzip/-/blob/master/proposals/tzip-15/tzip-15.md'>TZIP 15</Link> for *whitelisting* mechanism.

It defines transfer authorisation from users to other users. A user belongs to a list which is associated to other lists. Basically a user A can transfer to a user B if A's list is associated to the list B belongs to.

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `issuer` | `address` | Issuer is a special user that can transfer (inbound and outbound) to/from anyone. |
| `admin` | `address` | Admin can set the address of the issuer, and update the transfer lists data. |
| `users` | `big_map<adress, nat>`| A user, identified by the address, is associated to a list id. |
| `transferlists` | `big_map<nat, bool*set<nat>>` | A transfer list, identified by a `nat` id, is associated to:<lu><li>a boolean `unrestricted` state</li><li>a set `transferlists` of ids</li></lu> If `unrestricted` is false, then any transfer from the list or to the list is not authorised. If `unrestricted` is true, then transfers are allowed only to lists and from lists in the `transferlists` set. |

### Entrypoints

| Name | Parameter | Description |
| -- | -- | -- |
| `assertReceivers` | `list<addr>` | Fails if one user in the parameter list belongs to a restricted or inexistant list. It also fails if a user is not listed, or if its list is not listed. |
| `assertTransfers` | `list<address * list<address>>` | Parameter is a list of *from* addresses associated to a list of *to* addresses.<p/>Fails if <lu><li>a *from* user is restricted</li><li>or one of its associated user is restricted (a user is restricted if its associated list is restricted)</li><li>or if one of its associated user is not in the *from* address `transferlists`</li></lu>|
| `assertTransferList` | `nat` `option<bool* set<nat>>`| When option parameter is none, fails if list exists.<p/>When option parameter is some data, fails if:<lu><li>list does not exists</li><li>`unrestricted` state is equal to bool parameter</li><li>set of list ides is a subset of list's `transferlists`</li></lu> |
| `updateUser` | `address` `option<nat>`| Called by admin to associate a user address to a list, or remove the user from `users`. |
| `updateTransferlist` | `nat` `option<(bool * list<nat> * set<nat>` | Called by admin to remove a list from `transferlists` if option parameter is `none`.<p/>It adds or updates a transfer list's data if optional parameter is `some`:<lu><li>writes `unrestricted` state with boolean parameter</li><li>removes list ids from `transferlists`</li><li>adds list ids in set to `transferlists`</li></lu>  |
| `setAdmin` | `address` | Called by admin to set admin's address. |
| `setIssuer` | `address` | Called by admin to set issuer's address. |
| `getAdmin` | | Getter for admin's address. |
| `getIsuer` | | Getter for issuer's address. |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype
archetype a2(
  admin  : address,
  issuer : address
)

variable users         : big_map<address, nat>      = []

record transferlist {
  unrestricted         : bool;
  allowedTransferlists : set<nat>;
}
variable transferlists : big_map<nat, transferlist> = []

function assertReceiver(addr : address) : bool {
  return
    match getopt(users, addr) with
    | some v ->
        match getopt(transferlists, v) with
        | some(r) -> r.unrestricted
        | none -> false
        end
    | none   -> false
    end
}

entry assertReceivers (addrs : list<address>) {
  for addr in addrs do
    if (addr <> issuer)
    then dorequire(assertReceiver(addr), "USER_RESTRICTED")
  done
}

entry assertTransfers (input_list : list<address * list<address>>) {
  for input_item in input_list do
    var %from = input_item[0];
    var tos   = input_item[1];
    for %to in tos do
      if %from = issuer
      then dorequire(assertReceiver(%to), "TO_RESTRICTED")
      else begin
        dorequire(assertReceiver(%from), "FROM_RESTRICTED");
        dorequire(assertReceiver(%to), "TO_RESTRICTED");
        var fromid       = users[%from];
        var toid         = users[%to];
        var allowedlists = transferlists[fromid].allowedTransferlists;
        dorequire(contains(allowedlists, toid), "TO_NOT_ALLOWED")
      end
    done
  done
}

entry assertTransferlist (transferlistId : nat, input : option<transferlist>) {
  match input with
  | some tl -> begin
    dorequire(contains(transferlists, transferlistId), "TRANSFERLIST_NOT_FOUND");
    var l = transferlists[transferlistId];
    dorequire(l.unrestricted = tl.unrestricted, "INVALID_UNRESTRICTED_STATE");
    for i in tl.allowedTransferlists do
      dorequire(contains(l.allowedTransferlists, i), "IS_NOT_SUBSET")
    done
    end
  | none -> dofailif(contains(transferlists, transferlistId), "EXISTS_TRANSFERLIST")
  end
}

entry updateUser (user : address, transferlistId : option<nat>) {
  called by admin
  require {
    r0 otherwise "ISSUER_NOT_USER" : issuer <> user;
  }
  effect {
    users.update(user, transferlistId)
  }
}

entry updateTransferlist (
    transferlistId : nat,
    u : option<(bool * list<nat> * set<nat>)>) {
  called by admin
  effect {
    match u with
    | some v -> begin
      var ltransferlist = transferlists[transferlistId];
      var lunrestricted          = v[0];
      var ldisallowTransferlists = v[1];
      var lallowTransferlists    = v[2];
      ltransferlist.unrestricted := lunrestricted;
      for r in ldisallowTransferlists do
        ltransferlist.allowedTransferlists.remove(r)
      done;
      for a in lallowTransferlists do
        ltransferlist.allowedTransferlists.add(la)
      done;
      transferlists.put(transferlistId, ltransferlist)
      end
    | none -> transferlists.remove(transferlistId)
    end
  }
}

entry setAdmin (value : address) {
  called by admin
  effect {
    admin := value;
  }
}

entry setIssuer (value : address) {
  called by admin
  effect {
    issuer := value;
  }
}

getter getAdmin () : address {
  return admin
}

getter getIssuer () : address {
  return issuer
}

getter getUser (user : address) : option<nat> {
  return getopt(users, user)
}
```

</TabItem>

<TabItem value="michelson">

</TabItem>

<TabItem value="specification">

```archetype
specification function assertReceiver(addr: address) {
  postcondition p1 {
    let some tlid = users[addr] in
    let some tl   = transferlists[tlid] in
      result = tl.unrestricted
    otherwise result = false
    otherwise result = false
  }
}

specification entry assertReceivers (addrs : list<address>) {
  fails {
    f_assertReceivers with (msg: string):
      msg = "USER_RESTRICTED" and
      exists a : address,
        contains(addrs, a) and
        a <> issuer        and
        assertReceiver(a) = false;
  }
  postcondition p2 {
    users  = before.users  and transferlists = before.transferlists and
    issuer = before.issuer and admin = before.admin
  }
}

specification entry assertTransfers (input_list : list<address * list<address>>) {
  fails {
    f_assertTransfers with (msg: string):
      exists e : (address * list<address>),
        contains(input_list, e) and (
        let %from = e[0] in
        let tos   = e[1] in
        exists %to : address,
          contains(tos, %to) and ((
            msg = "TO_RESTRICTED" and
            %from = issuer and
            assertReceiver(%to) = false
          ) or (
            msg = "FROM_RESTRICTED" and
            assertReceiver(%from) = false
          ) or (
            msg = "TO_RESTRICTED" and
            assertReceiver(%to) = false
          ) or (
            let some fromid = users[%from] in
            let some toid   = users[%to] in
            let some tl     = transferlists[%fromid] in
              msg = "TO_NOT_ALLOWED" and
              not contains(tl.allowedTransferlists, toid)
            otherwise msg = "NOT_FOUND"
            otherwise msg = "NOT_FOUND"
            otherwise msg = "NOT_FOUND"
          )));
  }
  postcondition p3 {
    users  = before.users  and transferlists = before.transferlists and
    issuer = before.issuer and admin = before.admin
  }
}

specification entry assertTransferlist (transferlistId : nat, input : option<transferlist>) {
  fails {
    f_assertTransferlist with (msg : string):
    let some tl = input in (
      msg = "TRANSFERLIST_NOT_FOUND" and
      not contains(transferlists, transferlistId)
    ) or (
      msg = "INVALID_UNRESTRICTED_STATE" /*
      let some l = transferlists[transferlistId] in
        msg = "INVALID_UNRESTRICTED_STATE" and
        not l.unrestricted = tl.unrestricted
      otherwise msg = "NOT_FOUND" */
    ) or (
      exists i : nat,
      contains(tl.allowedTransferlists, i) and
      let some l = transferlists[transferlistId] in
      not contains(l.allowedTransferlists, i) and
      msg = "IS_NOT_SUBSET"
      otherwise msg = "NOT_FOUND"
    )
    otherwise
      msg = "EXISTS_TRANSFERLIST" and not contains(transferlists, transferlistId);
  }
  postcondition p4 {
    users  = before.users  and transferlists = before.transferlists and
    issuer = before.issuer and admin = before.admin
  }
}

specification entry updateUser (user : address, transferlistId : option<nat>) {
  fails {
    f_updateUser1 with (msg : string):
      msg = "Invalid CALLER" and
      caller <> admin;
    f_updateUser2 with (msg : string):
      msg = "ISSUER_NOT_USER" and
      issuer = user;
  }
  postcondition p5 {
    let some i = transferlistId in
      let some v = users[user] in
        v = i
      otherwise false
    otherwise
      let some v = users[user] in
      false
      otherwise true
  }
  postcondition p6 {
    forall a : address,
      a <> users ->
      let some na  = users[a] in
      let some bna = before.users[a] in
      na = bna
      otherwise true
      otherwise true
  }
}

specification entry updateTransferlist (
    transferlistId : nat,
    u : option<(bool * list<nat> * set<nat>)>) {
  fails {
    f_updateTransferlist with (msg : string):
      msg = "Invalid CALLER" and
      caller <> admin;
  }
  postcondition p7 {
    let some v = u in
      let some tl = transferlists[transferlistId] in
        let lunrestricted          = v[0] in
        let ldisallowTransferlists = v[1] in
        let lallowTransferlists    = v[2] in
        tl.unrestricted := lunrestricted and
        (forall r : nat,
          contains(ldisallowTransferlists, r) ->
          not contains(lallowTransferlists, r) ->
          not contains(tl.allowedTransferlists, r)) and
        (forall a : nat,
          contains(lallowTransferlists, a) ->
          contains(tl.allowedTransferlists, a))
      otherwise true
    otherwise
      let some tl = transferlists[transferlistId] in
        false
      otherwise true
  }
  postcondition p8 {
    forall i : nat,
      i <> transferlistId ->
      let some tl  = transferlists[i] in
      let some btl = before.transferlists[i] in
      tl = btl
      otherwise true
      otherwise true
  }
}
```

</TabItem>


</Tabs>