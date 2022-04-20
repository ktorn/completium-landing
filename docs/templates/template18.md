---
id: template18
title: Raffle
sidebar_label: Raffle
slug: /templates/raffle
---
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

A raffle is a gambling game, where players buy tickets; a winning ticket is _randomly_ picked and its owner gets the jackpot prize.

The [Michelson](https://tezos.b9lab.com/michelson) language does **not** provide an instruction to generate a random number. We can't use the current date (value of `now`) as a source of randomness either. Indeed, bakers have some control on this value for the blocks they produce, and could therefore influence the result.

:::info
The source code of the raffle contract and the orresponding test scenario are available in this [repository](https://gitlab.com/completium/archetype-raffle).
:::

## Picking the winning ticket

The winning ticket _id_ is obtained as the remainder of the euclidean division of an arbitraly large number, called here the _raffle key_, by the number of ticket buyers, called here _players_. For example, if the raffle key is 2022, and the number of raffle players is 87, then the winning ticket id is 21 (typically the 21st ticket).

The constraint is that this raffle key must not be known by anyone, nor the players or even the admin. Indeed if someone knows in advance the raffle key, it is then possible to influence the outcome of the game by buying tickets until one of them is the winning one (there is only one ticket per address, but someone can have several addresses). As a consequence:
* the _raffle key_ cannot be simply stored in the contract.
* the _raffle key_ cannot be a secret that only the admin knows (for the reason above), and that the admin would pass to the contract when it is time to announce the winner. Indeed, the admin could disappear, and no winner would ever be announced.

For the admin not to be the only one to know the key, each player must possess a part of the key (called here _partial key_), such that the raffle key is the sum of each player's partial key. For the player's partial key not to be known by the other players, it must be _cyphered_ by the player. When it comes to selecting the winning ticket, the user is required to _reveal_ its key for the contract to compute the raffle key.

However, a player could influence the outcome by not revealing the partial key. It is then necessary that the encrypted partial key can be _decrypted_ by anyone at some time. A reward is sent to the account that reveals a key.

The [timelock](https://tezos.gitlab.io/alpha/timelock.html?highlight=timelock) encryption feature of the Michelson `chest` data type provides the required property: a _timelocked_ value is encrypted strongly enough that even the most powerful computer will take more than a certain amount of time to crack it, but weakly enough that given a bit more time, any decent computer will manage to crack it. That is to say that, beyond a certain amount of time, the value may be considered public.

## Raffle key chest
In this tutorial example, the _chest time_ parameter imposed by the contract is `10000000`.

:::warning
Note that it's probably *not* a decent _chest time_ value since it takes only 20s to break on a standard computer ...
:::
### Generate chest value
Player Alice's partial key is `123456`, Player Jack's is `234567`, and Player Bob is `345678`.

To get the timelocked value, the value is first packed (turned into bytes) with the following tezos client command `hash data`:
```bash
$ tezos-client -E https://mainnet.api.tez.ie hash data '123456' of type nat
Warning:

                 This is NOT the Tezos Mainnet.

           Do NOT use your fundraiser keys on this network.

Raw packed data: 0x050080890f
```

We then use the Completium [timelock-utils](https://github.com/completium/timelock-utils) tool to timelock the packed data:
```bash
$ time ./timelock-utils --lock --data 050080890f --time 10000000
{
  "chest":
    "c5ecdde89eb8c1e7aaeb85abb8f5e5cef3b4fa80c4aee2fccbf0a78ce0debaa5e9ddede3ddfbd9abdea28cc7dc99e6d3a9baf3cbae9adaaabc89cbc39e97e2c7a6cba99197d19ba09ddfd181afc997ffbcc5acb2d29ecbb698c2cacbdd83d1b4ced0bffe9cd78295b3fba4d9f9d5f4d4ec9ad3c7e1a8eeb9dba5cbd8a2dbf29af8e4a4c1e4b1edacf98fccefaef9fea4f0bacdd38ecbfe81c3f9839b9e9ab8fbf5f1eabac48a9f8ca7c588eefe94d1f18bd9bcee9aecde8dd285cf9098f4e1a7eec787f3a0e0ff9cd0ce8ec5a2a4e5ecb08fce899eb5baa397fabf90de9397cebc81bbdfb386e6b4da9fd8fdd19ed9f8d684c782b0aacfeebae4f6e7d1c5c1e6a093c68081cf83b991b4ecd7b38aee92deddcad79eb9abe0a0a0c6b5909dc58495f69445fff5ae9cefe8b8beb2fb86ccf5c9ad91989bdad8a3cfbedaffa2de8bf19dc6ac8cbc8a9584fa9f85f9ba958fc6bbc09ac8e7d5f0fdb98b86c1c7d59ad7c6dfc2d2cefaf5d9db909bf0e3acd3ccc792bc9bccbab4a4febda9b685dbc39ea2a4a7b69990d3abd8b9b3d7dbc581b984f3e08a98f7f7f0e697cc8dfd88edc8c3ca8dc3b2a9ccf6cdd6d0efcc848bc8ead5858bbabfcfc1c8ecea84fd9b96a5e4eabb8c918dafe6f78d83e8e1c2e5f8ee88a4ee8dcaeeafffebfcbbfda1e9eb86c582f2eedd9299cbc0a7fce083ced8c8ddb0e7eaacb696c1fccdadcdc8e3c6f7b9de84eece9bb7919094fef4fdf6efd8b1ba8bbecb9380add4f59ddbf9a19f95facc84e9d0a99bfa93f1fcc3a0fbde9b9ce0c7e8dec6e8d1dfa7dda6f490bb9580abfdbcc0e202e5ff731c3c17d080ee430edd30979a47aa653656e11e593800000015c2ca2a23b732a72932611618ad9ea324986377591e"
  "key":
    "94a4f28fcdc3ece3e1ddcbe0f3e1ebb3f3e19daaa286c09986efd1b787b7a0d9bef2dfc8c4a8e2ebf3f8e3bdcaa998c9a3fe9c8a97f7b4ccedcd87b39fe39585898feab5e49fd095beb4f5d6e897d6fba08c9e9bfa8b9de7f5c7a686c0838ce5bfa985d6db86b4c2c4acc2facd9ea6a6c9ecd18c89b3acd79897e5fbc8d2e7feacd08ca1ec9beed2c7c8f3d3b9c0f9a2b1ccc782fda5c282abe9dfac9686e8bde2d0c6e1d8d68b8cd79dfc98a9b79bf5ecaccfd8ced1bae0caa5e5e286fbe2fba7968dcad0d5db95c1f1908288bb849ca9d78fd0eeeabec38ff4b5d4b6b9b6e7fcb2d789e498e8dbd8ceebc4d7cecb9ca8afc1ede6fc87e199dfe6a887e5c7a094af8dafdebef2f8db8ccc95f29fc4f0daa8e0b8bbaf9afc9befa6b5fbbacecec88fe69302a4c79db7b58c9c9a989799e2b7fee8c4f583f785fddcf9e7b1b9f3c5e0beb6aba48180a9c2b1fdbdebeeaff3b68af882ebf08885bfc8dfb0a7af84e4d091f4b492dbeec9b5b9ff8ae8daee80ffa1b3948fe598d7d2a0e19fa98192a4c5a1d9f5a3cf93ded78a858d9cab86939dd0abfed1adcec7fabf9ed38edba08f80c8b1f9fffbb78fa8e8bcb79f89afa2bcc4fb91d5b9988fccd998cbcb849eccf893f49cad9ec4dfdaaab0d1a1e3abc3c187fddab8f1a49cea96f7efb1f1dec9988895c6fcb9aa8ba4dca59bb08089b6d396b4a7e883eccab2928cb5d3c5cfacabd0d2d19dfab3aee49cd7c0e38fa2b3b0f2acb0cac5a0d8b8d381c3ee88ebdce6eeaffaf3acf29eb8fae6f3e2e7d8f6fdb9c8dafe929bcfcee3add3c4efdcb88eefebfebfe3e1bd02"
}
./timelock-utils --lock --data 050080890f --time 10000000  0.10s user 0.02s system 97% cpu 0.126 total
```
The timelock encryption generates a chest value, and the key to unlock it.

:::info
In the test scenario, Bob generates the chest value with the wrong time value `10000001`. As a result, the call to `reveal`  removes Bob as a player.
:::
### Crack chest

The following command is used to compute the chest key (ie. crack chest):
```bash
$ time ./timelock-utils --create-chest-key --chest c5ecdde89eb8c1e7aaeb85abb8f5e5cef3b4fa80c4aee2fccbf0a78ce0debaa5e9ddede3ddfbd9abdea28cc7dc99e6d3a9baf3cbae9adaaabc89cbc39e97e2c7a6cba99197d19ba09ddfd181afc997ffbcc5acb2d29ecbb698c2cacbdd83d1b4ced0bffe9cd78295b3fba4d9f9d5f4d4ec9ad3c7e1a8eeb9dba5cbd8a2dbf29af8e4a4c1e4b1edacf98fccefaef9fea4f0bacdd38ecbfe81c3f9839b9e9ab8fbf5f1eabac48a9f8ca7c588eefe94d1f18bd9bcee9aecde8dd285cf9098f4e1a7eec787f3a0e0ff9cd0ce8ec5a2a4e5ecb08fce899eb5baa397fabf90de9397cebc81bbdfb386e6b4da9fd8fdd19ed9f8d684c782b0aacfeebae4f6e7d1c5c1e6a093c68081cf83b991b4ecd7b38aee92deddcad79eb9abe0a0a0c6b5909dc58495f69445fff5ae9cefe8b8beb2fb86ccf5c9ad91989bdad8a3cfbedaffa2de8bf19dc6ac8cbc8a9584fa9f85f9ba958fc6bbc09ac8e7d5f0fdb98b86c1c7d59ad7c6dfc2d2cefaf5d9db909bf0e3acd3ccc792bc9bccbab4a4febda9b685dbc39ea2a4a7b69990d3abd8b9b3d7dbc581b984f3e08a98f7f7f0e697cc8dfd88edc8c3ca8dc3b2a9ccf6cdd6d0efcc848bc8ead5858bbabfcfc1c8ecea84fd9b96a5e4eabb8c918dafe6f78d83e8e1c2e5f8ee88a4ee8dcaeeafffebfcbbfda1e9eb86c582f2eedd9299cbc0a7fce083ced8c8ddb0e7eaacb696c1fccdadcdc8e3c6f7b9de84eece9bb7919094fef4fdf6efd8b1ba8bbecb9380add4f59ddbf9a19f95facc84e9d0a99bfa93f1fcc3a0fbde9b9ce0c7e8dec6e8d1dfa7dda6f490bb9580abfdbcc0e202e5ff731c3c17d080ee430edd30979a47aa653656e11e593800000015c2ca2a23b732a72932611618ad9ea324986377591e --time 10000000
94a4f28fcdc3ece3e1ddcbe0f3e1ebb3f3e19daaa286c09986efd1b787b7a0d9bef2dfc8c4a8e2ebf3f8e3bdcaa998c9a3fe9c8a97f7b4ccedcd87b39fe39585898feab5e49fd095beb4f5d6e897d6fba08c9e9bfa8b9de7f5c7a686c0838ce5bfa985d6db86b4c2c4acc2facd9ea6a6c9ecd18c89b3acd79897e5fbc8d2e7feacd08ca1ec9beed2c7c8f3d3b9c0f9a2b1ccc782fda5c282abe9dfac9686e8bde2d0c6e1d8d68b8cd79dfc98a9b79bf5ecaccfd8ced1bae0caa5e5e286fbe2fba7968dcad0d5db95c1f1908288bb849ca9d78fd0eeeabec38ff4b5d4b6b9b6e7fcb2d789e498e8dbd8ceebc4d7cecb9ca8afc1ede6fc87e199dfe6a887e5c7a094af8dafdebef2f8db8ccc95f29fc4f0daa8e0b8bbaf9afc9befa6b5fbbacecec88fe69302a4c79db7b58c9c9a989799e2b7fee8c4f583f785fddcf9e7b1b9f3c5e0beb6aba48180a9c2b1fdbdebeeaff3b68af882ebf08885bfc8dfb0a7af84e4d091f4b492dbeec9b5b9ff8ae8daee80ffa1b3948fe598d7d2a0e19fa98192a4c5a1d9f5a3cf93ded78a858d9cab86939dd0abfed1adcec7fabf9ed38edba08f80c8b1f9fffbb78fa8e8bcb79f89afa2bcc4fb91d5b9988fccd998cbcb849eccf893f49cad9ec4dfdaaab0d1a1e3abc3c187fddab8f1a49cea96f7efb1f1dec9988895c6fcb9aa8ba4dca59bb08089b6d396b4a7e883eccab2928cb5d3c5cfacabd0d2d19dfab3aee49cd7c0e38fa2b3b0f2acb0cac5a0d8b8d381c3ee88ebdce6eeaffaf3acf29eb8fae6f3e2e7d8f6fdb9c8dafe929bcfcee3add3c4efdcb88eefebfebfe3e1bd02
./timelock-utils --create-chest-key --chest  --time 10000000  19.45s user 0.03s system 99% cpu 19.491 total
```

## Raffle storage

The contract is originated with the following parameters:
* `owner` is the address of the contract administrator
* `jackpot` is the prize in tez
* `ticket_price` is the price in tez of a ticket

```archetype
archetype raffle(
  owner        : address,
  jackpot      : tez,
  ticket_price : tez)
```

### State
The contract holds:
* a state with 3 possible values:
  * `Created` is the initial state during which tickets cannot be bought yet
  * `Initialised` is the state when the administrator initialises the raffle
  * `Transferred` is the state when prize has been transferred to the winner
```archetype
states =
| Created initial
| Initialised
| Transferred
```
* the open date beyond which tickets can be bought, initialized to `none`
* the date beyond which tickets cannot be bought, initialized to `none`
```archetype
variable open_buy      : option<date> = none
variable close_buy     : option<date> = none
```

The schema below illustrates the periods defined by these dates, and the contract's states:
<ThemedImage
  alt="Raffle schema"
  width="80%"
  sources={{
    light: useBaseUrl('img/schema.light.svg'),
    dark: useBaseUrl('img/schema.dark.svg'),
  }}
/>

### Other
The contract also holds:
* the reveal fee, initialized to `none`:
```archetype
variable reveal_fee : option<rational> = none
```
* the time used to generate the timelocked value of the raffle key (it should be high enough to be compliant with the close date), initialized to `none`:
```archetype
variable chest_time : option<nat> = none
```

* a collection that will contain the addresses of all players and their raffle key:
```archetype
asset player {
  id                 : address;
  locked_raffle_key  : chest;        (* partial key *)
  revealed           : bool = false;
}
```

* the raffle key, updated when a player's partial key is revealed:
```archetype
variable raffle_key  : nat = 0
```

## Entrypoints

### `initialise`

The `initialise` entrypoint is called by the contract admin (called "_owner_") to set the main raffle parameters:
* _open buy_ is the date beyond which players can buy ticket
* _close buy_ is the date beyond which players cannot buy ticket
* _chest time_ is the difficulty to break players' partial raffle key encryption
* _reveal fee_ the pourcentage of ticket price transferred when revealing a player's raffle key

:::info
Currently you may count from a chest time of 500&nbsp;000 per second on a standard computer, to a chest time value of 500&nbsp;000&nbsp;000 per second on dedicated hardware.
:::

It requires that:
* the open and close dates be consistent
* the reveal fee be equal to or less than 1
* the transferred amount of tez be equal to the `jackpot` storage value

It transitions from `Created` state to `Initialised`, and sets the raffle parameters.

```archetype
transition initialise(ob : date, cb : date, t : nat, rf : rational) {
  called by owner
  require {
    r0 : now <= ob < cb         otherwise "INVALID_OPEN_CLOSE_BUY";
    r2 : rf <= 1                otherwise "INVALID_REVEAL_FEE";
    r3 : transferred = jackpot  otherwise "INVALID_AMOUNT"
  }
  from Created to Initialised
  with effect {
    open_buy      := some(ob);
    close_buy     := some(cb);
    chest_time    := some(t);
    reveal_fee    := some(rf)
  }
}
```

### `buy`

The `buy` entrypoint may be called by anyone to buy a ticket. The player must transfer the encrypted value of the partial raffle key, so that the partial key value may be potentially publically known when it comes to declaring the winner ticket.

It requires that:
* the contract be in `Initialised` state
* the transferred amount of tez be equal to the ticket price
* the close date not be reached

It records the caller's address in the `player` collection.

```archetype
entry buy (lrk : chest) {
  state is Initialised
  require {
    r4 : transferred = ticket_price                     otherwise "INVALID_TICKET_PRICE";
    r5 : opt_get(open_buy) < now < opt_get(close_buy)   otherwise "RAFFLE_CLOSED"
  }
  effect { player.add({ id = caller; locked_raffle_key = lrk }) }
}
```
:::info
Note that the `add` method _fails_ with `(Pair "KeyExists" "player")` if the caller is already in the collection.
:::

### `reveal`

The `reveal` entry point may be called by anyone to reveal a player's _partial_ key and contribute to the computation of the raffle key. The caller receives a percentage of the ticket price as a reward.

It requires that:
* the contract be in `Initialised` state
* the date is valid is beyond `close_buy`

```archetype
entry reveal(addr : address, k : chest_key) {
  state is Initialised
  require {
    r6 : opt_get(close_buy) < now   otherwise "RAFFLE_OPEN";
    r7 : not player[addr].revealed  otherwise "PLAYER_ALREADY_REVEALED"
  }
  effect {
    match open_chest(k, player[addr].locked_raffle_key, opt_get(chest_time)) with
    | left (unlocked) ->
      match unpack<nat>(unlocked) with
      | some(partial_key) ->
        raffle_key += partial_key;
        player[addr].revealed := true
      | none -> player.remove(addr)
      end
    | right(open_error) ->
      if open_error then fail("INVALID_CHEST_KEY")
      else player.remove(addr)
    end;
    transfer (opt_get(reveal_fee) * ticket_price) to caller;
  }
}
```
Note that the player `addr` may be removed in 2 situations:
1. the chest key opens the chest but is unable to decypher the content; this is the case if for example the chest was not generated with the correct chest time value
2. the chest is decyphered properly, but it does not contain an integer value

Note at last that in all cases, the caller is rewarded for the chest key when it is valid.

### `transfer`

When all players have been revealed, anyone can call the `transfer` entrypoint to transfer the jackpot to the the winning ticket. It transitions to `Transferred` state:
```archetype
transition %transfer() {
  require {
    r8: player.select(the.revealed).count() = player.count() otherwise "EXISTS_NOT_REVEALED"
  }
  from Initialised to Transferred
  with effect {
    transfer balance to player.nth(raffle_key % player.count());
  }
}
```

