---
id: template2
title: ERC20
sidebar_label: ERC20
slug: /templates/erc20
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

:::caution
It is strongly suggested to use the <Link to='/docs/templates/fa12'>FA 1.2</Link> norm for fungible token.
:::

## API

### Storage

| Name | Type | Description |
| -- | -- | -- |
| `total` | `nat` | total number of unit tokens. |
| `onetoken` | `nat` | number of units for one token. |
| `ledger` | `collection` | Association between token holder and number of tokens. |
| `allowance` | `collection` | Association between the pair owner and spender and the allowed amount. |
### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `transfer` | `to`, `value` | Transfers `value` tokens from *caller* to `to`. |
| `approve` | `spender`, `value` | Approves `spender` to transfer `value` tokens from *caller*. |
| `transferFrom` | `from`, `to`, `value`| Transfers `value` tokens from `from` to `to`. It requires that *caller* have been allowed by `from` to transfer this amount to `to`.  |

## Code

Deploy the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy erc20.arl --init '(1_000_000_000_000_000, 1_000_000, @tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG)'
```

The command sets:
* `total` variable to 10 millions
* `onetoken` variable to 1 million
* `initialholder` constant to `tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG`

<Link to='/docs/contract/programming-language#micheslon'>Michelson</Link> code is generated with version 1.2.3 of Archetype.

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
  ]}>

<TabItem value="archetype">


```archetype
archetype erc20(total : nat, onetoken: nat, const initialowner : address)

asset allowance identified by owner spender {
  owner     : address;
  spender     : address;
  amount      : nat;
}

asset ledger identified by holder {
  holder     : address;
  tokens     : nat = 0;
} initialized by {
  { holder = initialholder; tokens = total }
}

entry %transfer (to : pkey<ledger>, value : nat) {
  require {
    d0 : ledger[caller].tokens >= value
  }
  effect {
    ledger.addupdate(to,  { tokens += value });
    ledger.update(caller, { tokens -= value })
  }
}

entry approve(spender : address, value : nat) {
  require {
    d1 : ledger[caller].tokens >= value;
  }
  effect {
    allowance.addupdate((caller, spender), { amount = value });
  }
}

entry transferFrom(%from : address, %to : address, value : nat) {
  require {
    d3: allowance[(%from,caller)].amount >= value;
    d4: ledger[%from].tokens >= value
  }
  effect {
    (* update allowance *)
    allowance.update((%from,caller), { amount -=  value });
    (* update token *)
    ledger.addupdate(%to, { tokens += value });
    ledger.update(%from,  { tokens -= value });
  }
}
```

</TabItem>

<TabItem value="archetype">

```js

```

</TabItem>

</Tabs>