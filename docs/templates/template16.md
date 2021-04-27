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
| `issuer` | `address` | Issuer is a special user that can transfer to anyone. |
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
  ]}>

<TabItem value="archetype">

```archetype
archetype a2(
  admin  : address,
  issuer : address
)

record transferlist {
  unrestricted         : bool;
  allowedTransferlists : set<nat>;
}

variable users         : big_map<address, nat>      = []
variable transferlists : big_map<nat, transferlist> = []

function assertReceiver(addr : address) : bool {
  return
    match getopt(users, addr) with
    | some v -> transferlists[v].unrestricted
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

</Tabs>