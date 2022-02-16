---
id: template18
title: Raffle
sidebar_label: Raffle
slug: /templates/raffle
---
import Link from '@docusaurus/Link';

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

For the admin not to be the only one to know the key, each player must possess a part of the key (called here _partial key_), such that the raffle key is the sum of each player's partial key. For the player's partial key not to be known by the other players, it must be encrpypted by the player. However, it must also be possible for anyone to know any player's partial key when it is time to declare the winning ticket. Otherwise one player could decide to block the game by not decrypting its key.

The [timelock](https://tezos.gitlab.io/alpha/timelock.html?highlight=timelock) encryption feature of the Michelson `chest` data type provides the required property: a _timelocked_ value is encrypted strongly enough that even the most powerful computer will take more than a certain amount of time to crack it, but weakly enough that given a bit more time, any decent computer will manage to crack it. That is to say that, beyond a certain amount of time, the value may be considered public.

This means that if a player doesn't reveal the value of its partial _raffle key_ when expected, someone else could run the necessary computation to unlock it. The current contract sends a reward for the work of revealing a player's key.

## Chest value
In the [raffle test example](https://gitlab.com/completium/archetype-raffle/-/blob/main/tests/00-test.js), the _chest time_ parameter imposed by the contract is `10000000`.

:::warning
Note that it's probably *not* a decent _chest time_ value since it takes only 20s to break on a standard computer ...
:::

Player Alice's partial key is `123456` and Player Jack's is `234567`.

To get the timelocked value, the value is first packed (turned into bytes) with the following tezos client command `hash data`:
```bash
$ tezos-client -E https://hangzhounet.smartpy.io hash data '123456' of type nat
Warning:

                 This is NOT the Tezos Mainnet.

           Do NOT use your fundraiser keys on this network.

Raw packed data: 0x050080890f
```

We then use the Completium [timelock-utils](https://github.com/completium/timelock-utils) tool to timelock the packed data:
```bash
$ timelock-utils --lock --data 050080890f --time 100000
{
  "chest":
    "c5ecdde89eb8c1e7aaeb85abb8f5e5cef3b4fa80c4aee2fccbf0a78ce0debaa5e9ddede3ddfbd9abdea28cc7dc99e6d3a9baf3cbae9adaaabc89cbc39e97e2c7a6cba99197d19ba09ddfd181afc997ffbcc5acb2d29ecbb698c2cacbdd83d1b4ced0bffe9cd78295b3fba4d9f9d5f4d4ec9ad3c7e1a8eeb9dba5cbd8a2dbf29af8e4a4c1e4b1edacf98fccefaef9fea4f0bacdd38ecbfe81c3f9839b9e9ab8fbf5f1eabac48a9f8ca7c588eefe94d1f18bd9bcee9aecde8dd285cf9098f4e1a7eec787f3a0e0ff9cd0ce8ec5a2a4e5ecb08fce899eb5baa397fabf90de9397cebc81bbdfb386e6b4da9fd8fdd19ed9f8d684c782b0aacfeebae4f6e7d1c5c1e6a093c68081cf83b991b4ecd7b38aee92deddcad79eb9abe0a0a0c6b5909dc58495f69445fff5ae9cefe8b8beb2fb86ccf5c9ad91989bdad8a3cfbedaffa2de8bf19dc6ac8cbc8a9584fa9f85f9ba958fc6bbc09ac8e7d5f0fdb98b86c1c7d59ad7c6dfc2d2cefaf5d9db909bf0e3acd3ccc792bc9bccbab4a4febda9b685dbc39ea2a4a7b69990d3abd8b9b3d7dbc581b984f3e08a98f7f7f0e697cc8dfd88edc8c3ca8dc3b2a9ccf6cdd6d0efcc848bc8ead5858bbabfcfc1c8ecea84fd9b96a5e4eabb8c918dafe6f78d83e8e1c2e5f8ee88a4ee8dcaeeafffebfcbbfda1e9eb86c582f2eedd9299cbc0a7fce083ced8c8ddb0e7eaacb696c1fccdadcdc8e3c6f7b9de84eece9bb7919094fef4fdf6efd8b1ba8bbecb9380add4f59ddbf9a19f95facc84e9d0a99bfa93f1fcc3a0fbde9b9ce0c7e8dec6e8d1dfa7dda6f490bb9580abfdbcc0e202e5ff731c3c17d080ee430edd30979a47aa653656e11e593800000015c2ca2a23b732a72932611618ad9ea324986377591e"
  "key":
    "a0aceddfb3c9fbe1b8c382c7d5a7dedbe2e5adf9edcfc3e9d084caa6aeb9818ff1e985cb9efe8fa089ceeaa0f5d0bcb583e2f29196f2d3908fffffdcda868faffcb78fb697e7eaf3e7dca9d4b5dda2c3e4f8adf8abf484ecae85f7d6e0f2d28cb69af1d7b19082e8d8d7ba96e7e1e0bb8ac9b9fcf0a9e5b7c1a499c4faf4c8a3a9c8e4d09aa780eac6cee1b78a97a3e983abf9a5f1e8d2a2a2b5e3bcb8c4effeb7a3a68a85a497cd91c9a2c096c3f596deb8d1aca3a5aff28effb8cfc9c7ced892e3a7c09deeb8c8ec9387a3b384b5c8bccaafc7a9a2c1cfd8c7becfd7d6828a9af8f4988fe4ead3b59ecfb8ff8cabf8be90d4c8bdbddfce9cd7c2bb81edc4b7ad80a59a978f8c9debe7aaf08cf0c588f3eaade6b9f4e4e6edf1ed9c9988e48d9ba0aa8f01d18bac92b886db9dd798b5f6fdc891a28da2c4c48da1918897a2b7c2dfa0b78ab8e291b68fb1a2bfa5e8b88e9cabb0b5b0feabcffc9cfeee888ac4afeed9dc8bf5a4eaa9ae89a3838cf6cfd4f8acff8fa7aef7a9889fbbc7d8f6dde4edf3e58096e580e299e5b082b9cf85f3fe8ac6c0998eb1bcbab9bfb8fba39faea7bce0f6fed9ea86dfdad58cf7cbc7fcc4ecf7e2e898d3b19582e38c8092b7e4a0cddc83eb8bc38d91fefed6be869496b8e4fc99d5fae5c6a2b2dcabe2a4ea85b68b87b182d7e8cac29fe0b9efd6d0eb999ffa98aaaf9bf09fe7c4b39d81db97e4e7bbaef0e3bfedd69d9089bc8d91b292afa6c8b389fc9fb7aaa8decab6d9b493a6eafaa5baffe8fb85f2d483ecd1f2d1e58f938df9d8d5e385fe96c5f58ae1e0b09bf2b3c2931f"
}
```
The timelock encryption generates a chest value, and the key to unlock it.

## Raffle storage

The contract is originated with the following parameters:
* `owner` is the address of the contract administrator
* `min_duration` is the minimum duration of the period during which players can buy a ticket
* `jackpot` is the prize in tez
* `ticket_price` speaks for itslef

```archetype
archetype raffle(
  owner        : address,
  min_duration : duration,
  jackpot      : tez,
  ticket_price : tez)
```

The contract holds:
* the reveal fee, initialized to `none`:
```archetype
variable reveal_fee : option<rational> = none
```
* the date beyond which tickets cannot be bought, initialized to `none`:
```archetype
variable close_date : option<date> = none
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

* the number of revealed players:
```archetype
variable nb_revealed : nat = 0
```

* a state with 3 possible values:
  * `Created` is the initial state during which tickets cannot be bought yet
  * `Running` is the state when the administrator opens the raffle for ticket selling
  * `Transferred` is the state when prize has been transferred to the winner
```archetype
states =
| Created initial
| Running
| Transferred
```

## Entrypoints

### `open`

The `open` entrypoint is called by the contract admin (called "_owner_") to allow players to buy tickets. It sets the main raffle parameters:
* _close date_ is the date beyond which players cannot buy ticket
* _chest time_ is the difficulty to break players' partial raffle key encryption
* _reveal fee_ the pourcentage of ticket price transferred when revealing a player's raffle key

:::info
Currently you may count from a chest time of 500&nbsp;000 per second on a standard computer, to a chest time value of 500&nbsp;000&nbsp;000 per second on dedicated hardware.
:::

It requires that:
* the minimum duration be respected by the close date
* th reveal fee be equal to or less than 1
* the transferred amount of tez be equal to the `jackpot` storage value

It transitions from `Created` state to `Running`, and sets the raffle parameters.

```archetype
transition open(cd : date, t : nat, rf : rational) {
  called by owner
  require {
    r0 : now + min_duration < cd   otherwise "INVALID_CLOSE_DATE";
    r1 : rf <= 1                   otherwise "INVALID_REVEAL_FEE";
    r2 : transferred = jackpot     otherwise "INVALID_AMOUNT"
  }
  from Created to Running
  with effect {
    close_date := some(cd);
    chest_time := some(t);
    reveal_fee := some(rf)
  }
}
```

### `buy`

The `buy` entrypoint may be called by anyone to buy a ticket. The player must transfer the encrypted value of the partial raffle key, so that the partial key value may be potentially publically known when it comes to declaring the winner ticket.

It requires that:
* the contract be in `Running` state
* the transferred amount of tez be equal to the ticket price
* the close date not be reached

It records the caller's address in the `player` collection.

```archetype
entry buy (lrk : chest) {
  state is Running
  require {
    r2 : transferred = ticket_price otherwise "INVALID_TICKET_PRICE";
    r3 : now < opt_get(close_date)  otherwise "RAFFLE_CLOSED"
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
* the contract be in `Running` state
* the close date has been reached

```archetype
entry reveal(addr : address, k : chest_key) {
  state is Running
  require {
    r4 : now > opt_get(close_date) otherwise "RAFFLE_OPEN";
    r5 : not player[addr].revealed otherwise "PLAYER_ALREADY_REVEALED"
  }
  effect {
    match open_chest(k, player[addr].locked_raffle_key, chest_time) with
    | left (unlocked) -> raffle_key += opt_get(unpack<nat>(unlocked))
    | right(error)    -> fail("INVALID_TIMELOCK")
    end;
    nb_revealed += 1;
    player[addr].revealed := true;
    if nb_revealed = player.count() then
      transfer 0tz to entry self.transfer_jackpot();
    transfer (opt_get(reveal_fee) * ticket_price) to caller;
  }
}
```

When all players have revealed their raffle key, the transition from `Running` state to `Transferred` is executed with `transfer_jackpot`:
```archetype
transition transfer_jackpot() {
  called by selfaddress
  from Running to Transferred
  with effect {
    transfer balance to player.nth(raffle_key % player.count());
    player.clear()
  }
}
```
