---
id: template15
title: Connected Object
sidebar_label: Connected Object
slug: /templates/iot
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DeployIOT from './DeployIOT';

## Introduction

A connected object reads this contract to decide whether to switch on or off.

It reads the contract on a regular basis (typically every 5 second):
* it switches on if the *end of service* date is in the futur
* it switches off if the *end of service* date is in the past

The object is connected to the internet and executes an HTTP GET request to the Tezos blockchain on a regular basis, and reads the resulting Json answer.

Any user can transfer tezies to the contract to switch on the object for a duration determined by an exhange rate (tez to duration).

See this contract in action in the <Link to='/docs/dapp-iot/'>Connected Object</Link> DApp example.

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `owner` | `adddress` | Object owner can change exchange `rate` and collect payments. |
| `rate` | `rational` | Exchange rate between tez and duration: `rate` `time_unit` in exchange for `tez_unit` amount of payment. |
| `endofservice` | `date` | Date of end of service. Read by object to decide whether to switch on or off. |
| `startofservice` | `date` | Date of start of service. For information only. |
| `time_unit` | `duration` | Time unit used in service duration computation. |
| `tez_unit` | `tez` | Tez unit used in service duration computation. |
| `user` | `option<address>` | <ul><li>some address of the current user to switch on object</li><li> none otherwise</li></ul> |
| `read_interval` | `duration` | Frequency of read by object. |

### Entrypoints

| Name | Type | Description |
| -- | -- | -- |
| `start` | | Starts service. The duration *d* of service is computed as: <p />*d* = `rate` * *transferred* |
| `interrupt` | | User who started service can interrupt it. <p />It pays back the user so that only the effective duration of service is paid. |
| `collect` | | Owner collects payments. |
| `setunits` | `d`, `t` | Owner can set time unit to `d` and tez unit to `t` when computing duration of service. |

## Originate

Originate a switch contract with the widget below.

Click "Connect to Wallet" button, fill the fields "Owner" and "Rate", and click "Originate".

<DeployIOT />

### Command line

Originate the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy switch.arl --init '(@tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG, 2,5)'
```

The command sets:
* `owner` constant to `tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG`
* `rate` variable to 2.5


## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">

```archetype title="switch.arl"
archetype switch(
  owner : address,
  rate  : rational
)

variable endofservice    : date = now
variable startofservice  : date = now

variable time_unit : duration = 1m
variable tez_unit : tez = 1tz

variable user : option<address> = none

variable read_interval : duration = 5s

function get_rate_in_s_by_utz () : rational {
  var d : int = time_unit;
  var t : nat = tez_unit;
  return (rate * d / t)
}

function get_return_tz () : tez {
  var res : int = 1 / get_rate_in_s_by_utz() * (endofservice - now);
  return (res * 1utz)
}

entry start () {
  require { r1: now > endofservice }
  effect {
    var t : nat = transferred;
    var dur : duration = (get_rate_in_s_by_utz() * t)*1s;
    if dur > read_interval then begin
      endofservice   := now + dur + read_interval;
      startofservice := now;
      user := some(caller)
    end
  }
}

entry interrupt () {
  require { r2: caller = opt_get(user) and now < endofservice }
  effect {
    transfer (get_return_tz()) to caller;
    endofservice   := now - read_interval;
    startofservice := now - read_interval;
  }
}

entry collect () {
  called by owner
  effect {
    var keep = 0tz;
    if now < endofservice then
      keep := get_return_tz();
    if balance - keep > 0tz then
      transfer (balance - keep) to owner
  }
}

entry setunits (dunit : duration, tunit : tez) {
  called by owner
  effect {
    time_unit := dunit;
    tez_unit  := tunit;
  }
}
```

</TabItem>

<TabItem value="michelson">

```js
# (Pair owner (Pair rate (Pair 1618187115 (Pair 1618187115 (Pair 60 (Pair 1000000 (Pair None 5)))))))
{
  storage (pair (address %owner) (pair (pair %rate int nat) (pair (timestamp %endofservice) (pair (timestamp %startofservice) (pair (int %time_unit) (pair (mutez %tez_unit) (pair (option %user address) (int %read_interval))))))));
  parameter (or (unit %start) (or (unit %interrupt) (or (unit %collect) (pair %setunits (int %dunit) (mutez %tunit)))));
  code { LAMBDA
           (pair (pair int nat) (pair mutez int))
           (pair int nat)
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             PUSH unit Unit;
             DIG 1;
             DUP;
             DUG 2;
             PUSH mutez 1;
             DIG 4;
             DUP;
             DUG 5;
             EDIV;
             IF_NONE
               { PUSH string "DivByZero";
                 FAILWITH }
               { DUP;
                 CAR;
                 SWAP;
                 DROP };
             PUSH nat 1;
             DIG 1;
             DUP;
             DUG 2;
             INT;
             PAIR;
             PUSH nat 1;
             DIG 3;
             DUP;
             DUG 4;
             PAIR;
             DIG 7;
             DUP;
             DUG 8;
             PAIR;
             UNPAIR;
             DIP { UNPAIR };
             UNPAIR;
             DIP { SWAP };
             MUL;
             DIP { MUL };
             PAIR;
             PAIR;
             UNPAIR;
             DIP { UNPAIR };
             UNPAIR;
             DIG 3;
             PUSH int 0;
             DIG 4;
             DUP;
             DUG 5;
             COMPARE;
             GE;
             IF
               { INT }
               { NEG };
             MUL;
             DIP { MUL; ABS };
             PAIR;
             DIP { DIG 2; DROP };
             DUG 2;
             DROP 2;
             DUG 3;
             DROP 3 };
         LAMBDA
           (pair timestamp (pair (pair int nat) (pair mutez (pair int (lambda (pair (pair int nat) (pair mutez int)) (pair int nat))))))
           mutez
           { UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             UNPAIR;
             SWAP;
             PUSH unit Unit;
             NOW;
             DIG 6;
             DUP;
             DUG 7;
             SUB;
             DIG 2;
             DUP;
             DUG 3;
             DIG 4;
             DUP;
             DUG 5;
             DIG 6;
             DUP;
             DUG 7;
             PAIR;
             DIG 7;
             DUP;
             DUG 8;
             PAIR;
             EXEC;
             PUSH nat 1;
             PUSH nat 1;
             INT;
             PAIR;
             PAIR;
             UNPAIR;
             DIP { UNPAIR };
             UNPAIR;
             DIG 3;
             PUSH int 0;
             DIG 4;
             DUP;
             DUG 5;
             COMPARE;
             GE;
             IF
               { INT }
               { NEG };
             MUL;
             DIP { MUL; ABS };
             PAIR;
             PAIR;
             UNPAIR;
             UNPAIR;
             DIG 2;
             MUL;
             EDIV;
             IF_NONE
               { PUSH string "DivByZero";
                 FAILWITH }
               {  };
             CAR;
             PUSH mutez 1;
             PUSH nat 1;
             DIG 2;
             DUP;
             DUG 3;
             PAIR;
             PAIR;
             UNPAIR;
             UNPAIR;
             ABS;
             DIG 2;
             MUL;
             EDIV;
             IF_NONE
               { PUSH string "DivByZero";
                 FAILWITH }
               {  };
             CAR;
             DIP { DIG 1; DROP };
             DUG 1;
             DROP;
             DUG 5;
             DROP 5 };
         NIL operation;
         DIG 3;
         UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { DROP;
             DIG 5;
             DUP;
             DUG 6;
             NOW;
             COMPARE;
             GT;
             NOT;
             IF
               { PUSH string "InvalidCondition: r1";
                 FAILWITH }
               {  };
             PUSH mutez 1;
             AMOUNT;
             EDIV;
             IF_NONE
               { PUSH string "DivByZero";
                 FAILWITH }
               { DUP;
                 CAR;
                 SWAP;
                 DROP };
             PUSH int 1;
             PUSH nat 1;
             DIG 2;
             DUP;
             DUG 3;
             INT;
             PAIR;
             DIG 13;
             DUP;
             DUG 14;
             DIG 7;
             DUP;
             DUG 8;
             DIG 7;
             DUP;
             DUG 8;
             PAIR;
             DIG 11;
             DUP;
             DUG 12;
             PAIR;
             EXEC;
             PAIR;
             UNPAIR;
             DIP { UNPAIR };
             UNPAIR;
             DIP { SWAP };
             MUL;
             DIP { MUL };
             PAIR;
             PAIR;
             UNPAIR;
             UNPAIR;
             DIG 2;
             MUL;
             EDIV;
             IF_NONE
               { PUSH string "DivByZero";
                 FAILWITH }
               {  };
             CAR;
             DIG 2;
             DUP;
             DUG 3;
             DIG 1;
             DUP;
             DUG 2;
             COMPARE;
             GT;
             IF
               { DIG 2;
                 DUP;
                 DUG 3;
                 DIG 1;
                 DUP;
                 DUG 2;
                 NOW;
                 ADD;
                 ADD;
                 DIP { DIG 7; DROP };
                 DUG 7;
                 NOW;
                 DIP { DIG 6; DROP };
                 DUG 6;
                 SENDER;
                 SOME;
                 DIP { DIG 3; DROP };
                 DUG 3 }
               {  };
             DROP 2;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             SWAP;
             PAIR;
             DIG 1;
             PAIR }
           { IF_LEFT
               { DROP;
                 DIG 5;
                 DUP;
                 DUG 6;
                 NOW;
                 COMPARE;
                 LT;
                 DIG 2;
                 DUP;
                 DUG 3;
                 IF_NONE
                   { PUSH string "NoneValue";
                     FAILWITH }
                   {  };
                 SENDER;
                 COMPARE;
                 EQ;
                 AND;
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: r2";
                     FAILWITH }
                   {  };
                 DIG 8;
                 DUP;
                 DUG 9;
                 SENDER;
                 CONTRACT unit;
                 IF_NONE
                   { PUSH string "BadContract";
                     FAILWITH }
                   {  };
                 DIG 11;
                 DUP;
                 DUG 12;
                 DIG 13;
                 DUP;
                 DUG 14;
                 DIG 7;
                 DUP;
                 DUG 8;
                 PAIR;
                 DIG 6;
                 DUP;
                 DUG 7;
                 PAIR;
                 DIG 10;
                 DUP;
                 DUG 11;
                 PAIR;
                 DIG 9;
                 DUP;
                 DUG 10;
                 PAIR;
                 EXEC;
                 UNIT;
                 TRANSFER_TOKENS;
                 CONS;
                 DIP { DIG 8; DROP };
                 DUG 8;
                 DUP;
                 NOW;
                 SUB;
                 DIP { DIG 5; DROP };
                 DUG 5;
                 DUP;
                 NOW;
                 SUB;
                 DIP { DIG 4; DROP };
                 DUG 4;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 SWAP;
                 PAIR;
                 DIG 1;
                 PAIR }
               { IF_LEFT
                   { DROP;
                     DIG 7;
                     DUP;
                     DUG 8;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     PUSH mutez 0;
                     DIG 6;
                     DUP;
                     DUG 7;
                     NOW;
                     COMPARE;
                     LT;
                     IF
                       { DIG 10;
                         DUP;
                         DUG 11;
                         DIG 12;
                         DUP;
                         DUG 13;
                         DIG 6;
                         DUP;
                         DUG 7;
                         PAIR;
                         DIG 5;
                         DUP;
                         DUG 6;
                         PAIR;
                         DIG 9;
                         DUP;
                         DUG 10;
                         PAIR;
                         DIG 8;
                         DUP;
                         DUG 9;
                         PAIR;
                         EXEC;
                         SWAP;
                         DROP }
                       {  };
                     PUSH mutez 0;
                     DIG 1;
                     DUP;
                     DUG 2;
                     BALANCE;
                     SUB;
                     COMPARE;
                     GT;
                     IF
                       { DIG 9;
                         DUP;
                         DUG 10;
                         DIG 9;
                         DUP;
                         DUG 10;
                         CONTRACT unit;
                         IF_NONE
                           { PUSH string "BadContract";
                             FAILWITH }
                           {  };
                         DIG 2;
                         DUP;
                         DUG 3;
                         BALANCE;
                         SUB;
                         UNIT;
                         TRANSFER_TOKENS;
                         CONS;
                         DIP { DIG 9; DROP };
                         DUG 9 }
                       {  };
                     DROP;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     DIG 1;
                     PAIR }
                   { UNPAIR;
                     SWAP;
                     DIG 9;
                     DUP;
                     DUG 10;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     DIG 1;
                     DUP;
                     DUG 2;
                     DIP { DIG 5; DROP };
                     DUG 5;
                     DUP;
                     DIP { DIG 4; DROP };
                     DUG 4;
                     DROP 2;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     DIG 1;
                     PAIR } } };
         DIP { DROP 2 } };
}
```

</TabItem>

</Tabs>