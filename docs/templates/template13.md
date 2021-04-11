---
id: template13
title: Health care
sidebar_label: Health care
slug: /templates/healthcare
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This contract between a patient and its insurer establishes the rules of payment:
* between insurance and doctors
* between the patient and the insurer

The insurer pays the consultation price to the doctor.

The patient pays the insurer:
* a fee on a regular basis
* an amount per consultation capped to a fixed deductible amount

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `patient` | `address` | Patient's address. |
| `insurer` | `address` | Insurer's address. |
| `fee` | `tez` | Fee value, paid by patient to insurer every `fee_period` period of time. |
| `fee_period` | `duration` | Covering period for one `fee` payment. |
| `deductible` | `tez` | Maximum amount paid by `patient` to `insurer` for a consultation. |
| `doctor` | `collection` | A doctor is defined by an address and the debt due by `insurer` to doctor. |
| `last_fee_date` | `date` | Date of last fee payment. Used internally to compute number of due fees. |
| `patient_confirmed` | `bool` | Has patient confirmed contract ? Used internally to compute `Running` state. |
| `insurer_confirmed` | `bool` | Has insurer confirmed contract ? Used internally to compute `Running` state. |
| `deductible_debt` | `tez` | Sum of deductibles due by `patient` to `insurer`. |
| `_state` | `states` | One of `Created`, `Running`, `Canceled` |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `confirm` | | Called by `patient` and `insurer` to confirm contract. |
| `toRunning` | | Internally called by contract to set contrat to `Running` state when confirmed by `patient` and `insurer`. |
| `cancel` | | Called by `patient` or `insurer` to cancel contract. |
| `register_doctor` | `a` | Registers doctor at address `a`. |
| `declare_consultation` | `p` | A doctor declares a medical consultation for `patient` of price `p`. <p />It increments:<ul><li>`deductible_debt` (paid by `patient` to `insurer`) by the minimum of `p` and `deductible`</li><li>the debt of `insurer` (paid to doctor) by `p`</li></ul>  |
| `pay_doctor` | `doc` | `insurer` pays doctor `doc` the debt value (accumulated by `declare_declaration`). |
| `pay_fees` | | `patient` pays `insurer` the fee. <p />The amount is computed based on `last_fee_date` as the number of periods `period` multiplied by `fee`. It updates `last_fee_date`. |
| `pay_deductible` | | `patient` pays `insurer` the amount of `deductible_debt` (accumulated by `declare_declaration`). |

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype title="healthcare.arl"
archetype health_care(
  patient       : address,
  insurer       : address,
  fee           : tez,
  fee_period    : duration,
  deductible    : tez,
)

variable last_fee_date : date = now

variable patient_confirmed : bool = false
variable insurer_confirmed : bool = false

variable deductible_debt : tez = 0tz

asset doctor {
  addr : address;
  debt : tez = 0tz;
}

states =
| Created   initial
| Running
| Canceled

transition toRunning () {
  called by selfaddress
  from Created to Running
  with effect { last_fee_date := now }
}

entry confirm() {
  if caller = patient then patient_confirmed := true;
  if caller = insurer then insurer_confirmed := true;
  if patient_confirmed and insurer_confirmed then
    transfer 0tz to entry self.toRunning()
}

transition cancel () {
  called by insurer or patient
  from any to Canceled
}

entry register_doctor (a : address) {
  called by patient
  require { r1 : state = Running; }
  effect  { doctor.add ({ addr = a }) }
}

entry declare_consultation (p : tez) {
  require {
     r2 : state = Running;
     r3 : doctor.contains(caller);
  }
  effect {
    doctor.update(caller, { debt += p });
    deductible_debt += min(p, deductible)
  }
}

(* Payment from Insurance to Doctor *)

entry pay_doctor (doc : address) {
  called by insurer
  require { r4 : state = Running }
  effect {
    var decrease : tez = min(transferred, doctor[doc].debt);
    transfer decrease to doc;
    transfer (transferred - decrease) to insurer;
    doctor.update (doc, { debt -= decrease })
  }
}

(* Payments from Patient to Insuance *)

entry pay_fees () {
  called by patient
  require { r5 : state = Running }
  effect {
    var nb_periods : int = (now - last_fee_date) div fee_period;
    var due = nb_periods * fee;
    var decrease : tez = min (transferred, due);
    transfer decrease to insurer;
    transfer (transferred - decrease) to patient;
    last_fee_date += nb_periods * fee_period
  }
}

entry pay_deductibles () {
  called by patient
  require { r6 : state = Running; }
  effect {
    var decrease : tez = min (transferred, deductible_debt);
    transfer decrease to insurer;
    transfer (transferred - decrease) to patient;
    deductible_debt -= decrease
  }
}
```

</TabItem>

<TabItem value="michelson">

```js

```

</TabItem>

<TabItem value="specification">

```archetype title="healthcare.arl"
specification entry pay_doctor (docid : address) {
  postcondition p1 {
    balance = before.balance
  }
}

specification entry pay_fee () {
  postcondition p2 {
    balance = before.balance
  }
}

specification entry pay_consulation () {
  postcondition p3 {
    balance = before.balance;
  }
}
```

</TabItem>

</Tabs>