---
id: tuto7
title: Assets
sidebar_label: 7. Assets
slug: /contract/tuto/archetype-assets
hide_title: true
---
import Link from '@docusaurus/Link';

## Assets

A collection of assets is a convenient way to store indexed records of data; it comes with a rich API to read and write data to:
* add, remove, update, addupdate
* head, tail, sort, select
* sum
* ...

A detailed presentation of the asset API is available <a href='https://docs.archetype-lang.org/archetype-language/data-model' target='_blank'>here</a>.

In this exercise, a vehicle dealer manages his stock of rental cars on-chain for maximal transparency with customers and mechanical service suppliers:
* a car has a unique identifier, the *vin*, and is described with a color, the number of repairs and the last repair date.
* each time a car is repaired, the `repair` entry point is called to update the vehicle's repair data; it increments the number of repairs and updates the last date of repair.
* a mechanical service supplier specializes on repairing the 3 cars with olded repair dates; a dedicated entry point `repair_oldest` has been designed to ease the update process.
* a nother mechanical service supplier is specialised in repainting cars which have been repaired at least once. A dedicated entry point `repaint_repaired` has been designed.

```archetype {30,34,38-40,44-46} title="7-assets.arl"
archetype assets

enum color =
| White
| Yellow
| Red
| Blue

asset vehicle {
   vin        : string;
   c          : color = Yellow;
   nbrepairs  : nat   = 0;
   lastrepair : date  = now;
} initialized by {
  {"vin0000"; White;  0; 2020-01-01};
  {"vin0001"; Yellow; 0; 2020-01-01};
  {"vin0002"; White;  0; 2020-01-01};
  {"vin0003"; Red;    0; 2020-01-01};
  {"vin0004"; Red;    0; 2020-01-01};
  {"vin0005"; Yellow; 0; 2020-01-01};
  {"vin0006"; White;  0; 2020-01-01};
  {"vin0007"; Yellow; 0; 2020-01-01};
  {"vin0008"; Yellow; 1; 2019-01-01};
  {"vin0009"; Red;    3; 2019-04-01};
  {"vin0010"; White;  2; 2019-03-01};
  {"vin0011"; Yellow; 2; 2019-02-01}
}

entry addvehicle (pvin : string) {
  vehicle.add({ vin = pvin })
}

entry repair (k : string) {
  vehicle.update(k, { nbrepairs += 1; lastrepair = now})
}

entry repair_oldest() {
  for v in vehicle.sort(lastrepair).head(3) do
    vehicle.update(v, { nbrepairs += 1; lastrepair = now })
  done
}

entry repaint_repaired (newc : color) {
  for v in vehicle.select(the.nbrepairs >= 1) do
    vehicle[v].c := newc
  done
}
```

In the `addvehicle` entry point, the only necessary data to create the new asset is the vin because all other data have a default value. If no default value was set, the following would be necessary to create a new asset:

```archetype
 vehicle.add({ pvin; pcolor; 0; now })
```

In the `repaint_repaired` entry point, this update syntax is adapted when a single field is updated; otherwize the `update` operator is preferred for performance reason:

```
vehicle.update(v, { color := newc })
```

At last, note that the `sort` function sorts in ascending order. Another way to implement that is:

```archetype {1}
  for v in vehicle.sort(desc(lastrepair)).tail(3) do
    vehicle.update(v, { nbrepairs += 1; lastrepair = now })
  done
```

### Deploy

The following <Link to='/docs/cli'>Completium CLI</Link> command deploys the contract on the Tezos network:

```
completium-cli deploy 7-assets.arl
```

### Call entry point

The following command adds a vehicle:

```
completium-cli call 7-assets --entry addvehicle --arg '{ "pvin" : "vin0012" }'
```

The following command repairs vehicle with vin `vin0005`:

```
completium-cli call 7-assets --entry repair --arg '{ "k" : "vin0005" }'
```

The following repairs the 3 oldest vehicles:

```
completium-cli call 7-assets --entry repair_oldest
```

Finally, repaint repaired vehicles in blue:

```
completium-cli call 7-assets --entry repaint_repaired --arg '{ "c" : 3 }'
```

Enums are implemented with integer values starting from 0.

### Next

Open '8-1-contract_called.arl' and click on "Next: Call a Contract" below.
