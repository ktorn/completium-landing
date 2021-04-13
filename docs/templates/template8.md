---
id: template8
title: Idea box
sidebar_label: Idea box
slug: /templates/ideabox
---
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DeployIdeaBox from './DeployIdeaBox';
import DappButton from '../DappButton';

## Introduction

This contract implements an Idea Box on the <Link to='/docs/dapp-tools/tezos'>Tezos</Link> blockchain. The chairman registers voters and selects the best ideas. Voters are granted a fixed number of votes.

You can see this contract in action in the <Link to='/docs/dapp-ideabox/'>Idea Box</Link> DApp example.
## API

### Storage

Ideas data (title and description) are stored as `bytes`.

| Name | Type | Description |
| -- | -- | -- |
| `chairman` | `address` | Address of the box's chairman |
| `maxvotes` | `nat` | Maximum number of votes per voter. |
| `idea` | `collection` | An idea is defined by:<ul><li>an identifier (key)</li><li>a title</li><li>a description</li><li>a number of votes</li><li>a creation date</li><li>the author's address</li></ul>
| `voter` | `collection` | A voter is defined by:<ul><li>an address (key)</li><li>a number of remaining votes</li></ul>
| `selected` | `collecter` | This is the collection of selected ideas. |
| `_state` | `states` | Box state, one of `Activated`, `Terminated`. |

### Entrypoints

| Name | Parameters | Description |
| -- | -- | -- |
| `register` | `a` | Called by `chairman` to register a new voter at address `a` and remaining votes at `maxvotes`. |
| `add_idea` | `ititle`, `description` | Adds an idea in the box if box not terminated (*anyone* can add an idea). |
| `vote` | `n`, `weight` | Called by a voter to increment by `weight` the number of votes of idea `n`. It fails if box is terminated. |
| `terminate` | | Called by `chairman` to close the box and select the top 3 best ideas with numbers of votes above `maxvotes`. |

## Originate

Originate a switch contract with the widget below.

Click "Connect to Wallet" button, fill the fields "Owner" and "Rate", and click "Originate".

<DeployIdeaBox />

### Command line

Originate the contract from <a href='https://archetype-lang.org/'>Archetype</a> code below with the following <Link to='/docs/cli'>Completium CLI</Link> example command:

```
completium-cli deploy ideabox.arl --init '(@tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG, 5)'
```

The command sets:
* `chairman` variable to `tz1LLJ3nxbpGGMLmjzcp9sTMYui87tycG6nG`
* `maxvotes` variable to 2.5

## Code

<Tabs
  defaultValue="archetype"
  values={[
    { label: 'Archetype', value: 'archetype', },
    { label: 'Michelson', value: 'michelson', },
    { label: 'Scenario', value: 'scenario', },
    { label: 'Specification', value: 'specification', },
  ]}>

<TabItem value="archetype">

```archetype title="ideabox.arl"
archetype ideasbox(chairman : address, maxvotes : nat)

states =
| Activated initial
| Terminated

asset idea {
  id       : nat;
  title    : bytes;
  desc     : bytes;
  nbvotes  : nat = 0;
  creation : date;
  author   : address;
}

asset voter {
  addr      : address;
  remaining : nat = maxvotes;
}

asset selected {
  sid : nat;
}

entry register (a_voter : address) {
  called by chairman
  require {
    r0 : state = Activated;
  }
  effect { voter.add({ addr = a_voter }) }
}

entry add_idea(ititle : bytes, description : bytes) {
  require {
    r1 : state = Activated;
  }
  effect {
    idea.add({
      id       = idea.count();
      title    = ititle;
      desc     = description;
      creation = now;
      author   = caller
    })
  }
}

entry vote(n : nat, weight : nat) {
  require {
    r2 : voter.contains(caller);
    r3 : voter[caller].remaining >= weight;
    r4 : state = Activated;
  }
  effect {
    voter[caller].remaining -= weight;
    idea[n].nbvotes += weight;
  }
}

transition terminate () {
  called by chairman
  from Activated
  to Terminated
  with effect {
    for i in idea.select(the.nbvotes > maxvotes).sort(desc(nbvotes)).head(3) do
        selected.add({i})
    done
  }
}
```

</TabItem>

<TabItem value="michelson">

The <Link to='/docs/contract/programming-language#micheslon'>Michelson</Link> code is generated with version 1.2.3 of Archetype.

```js
# (Pair chairman (Pair maxvotes (Pair 0 (Pair {  } (Pair {  } {  })))))
{
  storage (pair (address %chairman) (pair (nat %maxvotes) (pair (nat %_state) (pair (map %idea nat (pair (bytes %title) (pair (bytes %desc) (pair (nat %nbvotes) (pair (timestamp %creation) (address %author)))))) (pair (map %voter address nat) (set %selected nat))))));
  parameter (or (address %register) (or (pair %add_idea (bytes %ititle) (bytes %description)) (or (pair %vote (nat %n) (nat %weight)) (unit %terminate))));
  code { UNPAIR;
         DIP { UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP; UNPAIR; SWAP };
         IF_LEFT
           { DIG 6;
             DUP;
             DUG 7;
             SENDER;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCaller";
                 FAILWITH }
               {  };
             PUSH nat 0;
             DIG 5;
             DUP;
             DUG 6;
             COMPARE;
             EQ;
             NOT;
             IF
               { PUSH string "InvalidCondition: r0";
                 FAILWITH }
               {  };
             DIG 2;
             DUP;
             DUG 3;
             DIG 1;
             DUP;
             DUG 2;
             MEM;
             IF
               { PUSH string "KeyAlreadyExists";
                 FAILWITH }
               { DIG 2;
                 DUP;
                 DUG 3;
                 DIG 6;
                 DUP;
                 DUG 7;
                 SOME;
                 DIG 2;
                 DUP;
                 DUG 3;
                 UPDATE;
                 DIP { DIG 2; DROP };
                 DUG 2 };
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
             NIL operation;
             PAIR }
           { IF_LEFT
               { UNPAIR;
                 SWAP;
                 PUSH nat 0;
                 DIG 6;
                 DUP;
                 DUG 7;
                 COMPARE;
                 EQ;
                 NOT;
                 IF
                   { PUSH string "InvalidCondition: r1";
                     FAILWITH }
                   {  };
                 DIG 4;
                 DUP;
                 DUG 5;
                 DIG 5;
                 DUP;
                 DUG 6;
                 SIZE;
                 MEM;
                 IF
                   { PUSH string "KeyAlreadyExists";
                     FAILWITH }
                   { DIG 4;
                     DUP;
                     DUG 5;
                     SENDER;
                     NOW;
                     PAIR;
                     PUSH nat 0;
                     PAIR;
                     DIG 2;
                     DUP;
                     DUG 3;
                     PAIR;
                     DIG 3;
                     DUP;
                     DUG 4;
                     PAIR;
                     SOME;
                     DIG 6;
                     DUP;
                     DUG 7;
                     SIZE;
                     UPDATE;
                     DIP { DIG 4; DROP };
                     DUG 4 };
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
                 NIL operation;
                 PAIR }
               { IF_LEFT
                   { UNPAIR;
                     SWAP;
                     DIG 3;
                     DUP;
                     DUG 4;
                     SENDER;
                     MEM;
                     NOT;
                     IF
                       { PUSH string "InvalidCondition: r2";
                         FAILWITH }
                       {  };
                     DUP;
                     DIG 4;
                     DUP;
                     DUG 5;
                     SENDER;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     COMPARE;
                     GE;
                     NOT;
                     IF
                       { PUSH string "InvalidCondition: r3";
                         FAILWITH }
                       {  };
                     PUSH nat 0;
                     DIG 6;
                     DUP;
                     DUG 7;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCondition: r4";
                         FAILWITH }
                       {  };
                     DIG 3;
                     DUP;
                     DUG 4;
                     SENDER;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     DIG 4;
                     DUP;
                     DUG 5;
                     PUSH int 0;
                     DIG 3;
                     DUP;
                     DUG 4;
                     INT;
                     DIG 3;
                     DUP;
                     DUG 4;
                     SUB;
                     COMPARE;
                     GE;
                     IF
                       { DIG 2;
                         DUP;
                         DUG 3;
                         INT;
                         DIG 2;
                         DUP;
                         DUG 3;
                         SUB;
                         ABS }
                       { PUSH string "AssignNat";
                         FAILWITH };
                     SOME;
                     SENDER;
                     UPDATE;
                     DIP { DIG 4; DROP };
                     DUG 4;
                     DROP;
                     DIG 4;
                     DUP;
                     DUG 5;
                     DIG 2;
                     DUP;
                     DUG 3;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     DIG 5;
                     DUP;
                     DUG 6;
                     DIG 6;
                     DUP;
                     DUG 7;
                     DIG 4;
                     DUP;
                     DUG 5;
                     GET;
                     IF_NONE
                       { PUSH string "GetNoneValue";
                         FAILWITH }
                       {  };
                     UNPAIR;
                     SWAP;
                     UNPAIR;
                     SWAP;
                     UNPAIR;
                     DROP;
                     DIG 5;
                     DUP;
                     DUG 6;
                     DIG 5;
                     DUP;
                     DUG 6;
                     CDR;
                     CDR;
                     CAR;
                     ADD;
                     PAIR;
                     SWAP;
                     PAIR;
                     SWAP;
                     PAIR;
                     SOME;
                     DIG 4;
                     DUP;
                     DUG 5;
                     UPDATE;
                     DIP { DIG 5; DROP };
                     DUG 5;
                     DROP 3;
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
                     NIL operation;
                     PAIR }
                   { DROP;
                     DIG 5;
                     DUP;
                     DUG 6;
                     SENDER;
                     COMPARE;
                     EQ;
                     NOT;
                     IF
                       { PUSH string "InvalidCaller";
                         FAILWITH }
                       {  };
                     DIG 3;
                     DUP;
                     DUG 4;
                     DUP;
                     PUSH nat 0;
                     COMPARE;
                     EQ;
                     IF
                       { NIL nat;
                         NIL nat;
                         PUSH nat 0;
                         PAIR;
                         NIL nat;
                         NIL nat;
                         NIL nat;
                         DIG 8;
                         DUP;
                         DUG 9;
                         ITER { UNPAIR;
                                DIG 12;
                                DUP;
                                DUG 13;
                                DIG 2;
                                DUP;
                                DUG 3;
                                CDR;
                                CDR;
                                CAR;
                                COMPARE;
                                GT;
                                IF
                                  { DIG 2;
                                    DUP;
                                    DUG 3;
                                    DIG 1;
                                    DUP;
                                    DUG 2;
                                    CONS }
                                  { DIG 2;
                                    DUP;
                                    DUG 3 };
                                DIP { DIG 2; DROP };
                                DUG 2;
                                DROP 2 };
                         ITER { DIG 1;
                                DUP;
                                DUG 2;
                                DIG 1;
                                DUP;
                                DUG 2;
                                CONS;
                                DIP { DIG 1; DROP };
                                DUG 1;
                                DROP };
                         ITER { DIG 7;
                                DUP;
                                DUG 8;
                                DIG 1;
                                DUP;
                                DUG 2;
                                GET;
                                IF_NONE
                                  { PUSH string "GetNoneValue";
                                    FAILWITH }
                                  {  };
                                NIL nat;
                                DIG 2;
                                DUP;
                                DUG 3;
                                SOME;
                                PAIR;
                                DIG 3;
                                DUP;
                                DUG 4;
                                ITER { DIG 1;
                                       DUP;
                                       DUG 2;
                                       CAR;
                                       DIG 2;
                                       DUP;
                                       DUG 3;
                                       CDR;
                                       DIG 1;
                                       DUP;
                                       DUG 2;
                                       IF_NONE
                                         { DUP;
                                           DIG 3;
                                           DUP;
                                           DUG 4;
                                           CONS;
                                           DIG 2;
                                           DUP;
                                           DUG 3;
                                           PAIR }
                                         { PUSH int 0;
                                           DIG 14;
                                           DUP;
                                           DUG 15;
                                           DIG 5;
                                           DUP;
                                           DUG 6;
                                           GET;
                                           IF_NONE
                                             { PUSH string "GetNoneValue";
                                               FAILWITH }
                                             {  };
                                           DIG 7;
                                           DUP;
                                           DUG 8;
                                           CDR;
                                           CDR;
                                           CAR;
                                           DIG 1;
                                           DUP;
                                           DUG 2;
                                           CDR;
                                           CDR;
                                           CAR;
                                           COMPARE;
                                           LT;
                                           IF
                                             { PUSH int 1 }
                                             { PUSH int 0 };
                                           DIP { DROP };
                                           COMPARE;
                                           GT;
                                           IF
                                             { DIG 1;
                                               DUP;
                                               DUG 2;
                                               DIG 7;
                                               DUP;
                                               DUG 8;
                                               CONS;
                                               DIG 4;
                                               DUP;
                                               DUG 5;
                                               CONS;
                                               NONE nat;
                                               PAIR }
                                             { DIG 1;
                                               DUP;
                                               DUG 2;
                                               DIG 4;
                                               DUP;
                                               DUG 5;
                                               CONS;
                                               DIG 3;
                                               DUP;
                                               DUG 4;
                                               PAIR };
                                           SWAP;
                                           DROP };
                                       DIP { DROP };
                                       DIP { DROP };
                                       DIP { DIG 1; DROP };
                                       DUG 1;
                                       DROP };
                                DUP;
                                CAR;
                                DIG 1;
                                DUP;
                                DUG 2;
                                CDR;
                                NIL nat;
                                DIG 2;
                                DUP;
                                DUG 3;
                                IF_NONE
                                  { DIG 1;
                                    DUP;
                                    DUG 2 }
                                  { DIG 2;
                                    DUP;
                                    DUG 3;
                                    DIG 7;
                                    DUP;
                                    DUG 8;
                                    CONS;
                                    SWAP;
                                    DROP };
                                ITER { DIG 1;
                                       DUP;
                                       DUG 2;
                                       DIG 1;
                                       DUP;
                                       DUG 2;
                                       CONS;
                                       DIP { DIG 1; DROP };
                                       DUG 1;
                                       DROP };
                                DIP { DROP };
                                DIP { DROP };
                                DIP { DROP };
                                DIP { DROP };
                                DIP { DIG 1; DROP };
                                DUG 1;
                                DROP };
                         ITER { PUSH nat 3;
                                DIG 2;
                                DUP;
                                DUG 3;
                                CAR;
                                COMPARE;
                                LT;
                                IF
                                  { DIG 1;
                                    DUP;
                                    DUG 2;
                                    CDR;
                                    DIG 1;
                                    DUP;
                                    DUG 2;
                                    CONS;
                                    PUSH nat 1;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    ADD;
                                    PAIR }
                                  { DIG 1;
                                    DUP;
                                    DUG 2;
                                    CDR;
                                    PUSH nat 1;
                                    DIG 3;
                                    DUP;
                                    DUG 4;
                                    CAR;
                                    ADD;
                                    PAIR };
                                DIP { DIG 1; DROP };
                                DUG 1;
                                DROP };
                         CDR;
                         ITER { DIG 1;
                                DUP;
                                DUG 2;
                                DIG 1;
                                DUP;
                                DUG 2;
                                CONS;
                                DIP { DIG 1; DROP };
                                DUG 1;
                                DROP };
                         ITER { DIG 2;
                                DUP;
                                DUG 3;
                                DIG 1;
                                DUP;
                                DUG 2;
                                MEM;
                                IF
                                  { PUSH string "KeyAlreadyExists";
                                    FAILWITH }
                                  { DIG 2;
                                    DUP;
                                    DUG 3;
                                    PUSH bool True;
                                    DIG 2;
                                    DUP;
                                    DUG 3;
                                    UPDATE;
                                    DIP { DIG 2; DROP };
                                    DUG 2 };
                                DROP };
                         PUSH nat 1;
                         DIP { DIG 4; DROP };
                         DUG 4 }
                       { PUSH string "InvalidState";
                         FAILWITH };
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
                     NIL operation;
                     PAIR } } } };
}
```

</TabItem>

<TabItem value="scenario">

The <Link to='/docs/contract/test-scenario'>scenario</Link> assumes three accounts are available:
* `admin`, the current one
* `alice`
* `bob`

To run the test, run the following script:

```
cd ideabox
npm install
npm test
```

in the <Link to='/docs/dapp-tools/gitpod#user-interface'>Terminal</Link> of the gitpod environment:

<DappButton url='https://gitpod.io/#https://github.com/edukera/completium-contract-templates' txt="open gitpod"/>

```js title="test.js"
const assert     = require('assert');
const Completium = require('@completium/completium-cli');

const test = async () => {
  const completium = new Completium ();
  await completium.originate('ideabox.arl', {
    init: '(' + completium.getAddress('admin') + ',5)'
  });
  // add 4 ideas
  await completium.call('ideabox', {
    entry : 'add_idea',
    with  : '(0x1a85302e204e0860760ce002008b409e2825bc0c607b015d631100ccf49100ddc28e7880,0x248020ee0f60ae03602621812c0d60531005c22003809c25c2019c34c00b010d311838d2a06109f5c03a100630803b129037c790803741497807310016c9324c55f004f10a2d2634f8abf1054e44062569c24247945eb4f88006a9bb6e9220e15358cb85102b1be4ea054b2fa60cae4d4b42ad020e868b83ed0c204485c923230106058380410e20c58141800466826ea543050180066ac8518b27c682a9c001299681ac2b2ba6af89a540ada2eb9f98d0a484aaaaee696d62e95303e7e887c529c00ca10b2185d68bcaed0c530e134b316d0d620b61a5a3a7a6ead2000828bea8e0f8848e2d237870626b1968b8038096c9575b80a6de12041529510190b8507c14c54001a3a081a81a6c9e1245e3c01d784832be978080c84050203ab0806888625448011a83406e06d061014632a98e6571b0d46adc841f0b83c95b28b1a07914828b452be84ee41c09170557c1483010902f0d059000a9d86ec21e2c970507bbb080)'
  });
  await completium.call('ideabox', {
    entry : 'add_idea',
    with  : '(0x1285306e096620040e204302d8804e06718184036057008c6015403b1c07b018c06b100130108800,0x0a87b0040ee01620b6604b00b996043027980c6201db6029804e7803460092612502780d6558033800e85a4c06623134c00ae2cd1e00262cc086e54c6700c27cd803a308561b00362032142934589cc291c1207b31102d26d426002a9e64848c065246893e80f4f345a189a240c181c873898209b3e2c8292aaaf3f0820bf00399a2c3d1a581e21110db2023eaa8020819c5a22b10a9a86b6aebdb521001ba11e182f20a47b6d30821a0b3c3d14b7370936580038a679983ca6a08011a39e36b6032b8d382c16360999b10b2a803abda0d8306e2c2c377216349a9e1f4b00cb1224823d5f135c954276cc0c44200169e8ef64209bcd35991de68b15939d69b231f12e1d68905bc46583a896e63a1b120c8282b0be084d1a1f8f8bcb7190c73009c4929142d010925c6c1f14742602eed08cae2e1a64ab5454146a0b0f4b970269e84c1166d0844c164df6ef43a48d8a96c14106936e159e0943f98b94aa601eb18600c0a59440000)'
  });
  await completium.call('ideabox', {
    entry : 'add_idea',
    with  : '(0x130060a40040260960ce06303d815c07601709206638806e31402992100e602180b624454208971c4804e30b10e1c4038806100aa11e03682c127000e18612344000,0x130060a40040260960ce06303d815c07601709206638806e31402992100e602180b624454208971c4804e30b10e1c4038806100aa10024805900f210d840c002de2caa44d05381003baa003650200077624306009e1068a040a2093470509f1a4aa08e8601d25539b17d1c152e890f94807b040986150c087b2680190400108a74393b3a04002338000d2e402b243268242e3e150f0916bc8c1d26a1892479a440118a160c161c09090d26ae8c0035bd00440f40c0051c00250439aa1595259a3f54003d1695260402aa838001963b7b1218e2e99864444911e680328028a6c00cb3fc81d612ca11cb968e2c3753c9c886558f0f89d2c04d8c481a391e06813a4cd0f63c09010182f100)'
  });
  await completium.call('ideabox', {
    entry : 'add_idea',
    with  : '(0x3884b06602e0040c2086027009819c0846a0,0x3a80b09e0040c608607601708124201b03d8c026102da4039809601992b004ed80ce131886fa431450602ba210d4c220c24a861a00ee30c1d0100dc02984181001188f851e42261c6bce93401d04190d0844d1165c1a1d28681428cc396643caab4228e2fdf3cd1aee050cd289d64d10c20013538156df18868684c21389031020024015401c4014452001d0a312810b9bcc0235000adb491b565700104f06000bdd3e8ac116470534851b0fa01854b0b0d494a5c1220e529216c6178e1ab3d961494d0349908992989084091cc099554e1d53dbc41531da5927d0bc09360d1a061a823f200545000e47e0079080fc32c80032840467940564004a91080001400327966842f200426c440507f484419a107846351a0847fc20408018ad34120800888200425908721fe790854380c8305448108880438164fd100000)'
  });
  try {
    await completium.call('ideabox', {
      entry : 'vote',
      with  : '(0,1)',
      as    : 'alice'
    });
    assert(false, "Non Registered Voter Should Not Be Able To Vote.");
  } catch (e) {
    assert(true);
  }
  await completium.call('ideabox', {
    entry : 'register',
    with  : completium.getAddress('alice'),
  });
  await completium.call('ideabox', {
    entry : 'vote',
    with  : '(0,5)',
    as    : 'alice'
  });
  try {
    await completium.call('ideabox', {
      entry : 'vote',
      with  : '(0,5)',
      as    : 'alice'
    });
    assert(false, "Voter Should Not Be Able To Vote More Than 5 Times.");
  } catch (e) {
    assert(true);
  }
  await completium.call('ideabox', {
    entry : 'register',
    with  : completium.getAddress('bob'),
  });
  await completium.call('ideabox', {
    entry : 'vote',
    with  : '(0,1)',
    as    : 'bob'
  });
  await completium.call('ideabox', {
    entry : 'vote',
    with  : '(1,4)',
    as    : 'bob'
  });
  await completium.call('ideabox', { entry : 'terminate' });
  // Check nb votes and that only idea 0 is selected
  const storage = await completium.getStorage('ideabox');
  const idea0 = storage.idea.get('0');
  const idea1 = storage.idea.get('1');
  const nbvotes_0 = idea0[Object.keys(idea0)[3]].toNumber();
  const nbvotes_1 = idea1[Object.keys(idea0)[3]].toNumber();
  assert(nbvotes_0 == 6, "Invalid Number Of Votes Idea 0");
  assert(nbvotes_1 == 4, "Invalid Number Of Votes Idea 1");
  assert(true);
}

test();
```

</TabItem>


<TabItem value="specification">

```archetype title="ideabox.arl"
specification {
  i1 : maxvotes * voter.count() = idea.sum(nbvotes) + voter.sum(remaining)
}

specification entry add_idea(ititle : bytes, description : bytes) {
  fails {
    add_idea_f1 with (msg : string) :
      msg = "InvalidState" and
      state <> Activated;
    add_idea_f2 with (msg : string) :
      msg = "KeyAlreadyExists" and
      false;
  }
  postcondition add_idea_p1 {
    forall i in added.idea, i.id = before.idea.count() and
    added.idea.count() = 1
  }
}

specification entry register(a_voter : address) {
  fails {
    register_f1 with (msg : string) :
      msg = "InvalidState" and
      state <> Activated;
    register_f2 with (msg : string) :
      msg = "InvalidCaller" and
      caller <> chairman;
    register_f3 with (msg : string) :
      msg = "KeyAlreadyExists" and
      voter.contains(a_voter);
  }
  postcondition register_p1 {
    forall v in added.voter, v.addr = a_voter and
    added.voter.count() = 1
  }
}

specification entry vote (n : nat, weight : nat) {
  fails {
    f0 with (msg : string) :
      msg = "GetNoneValue" and
      (not voter.contains(caller) or not idea.contains(n));
    f1 with (msg : string) :
      let some v = voter[caller] in
        v.remaining < weight
      otherwise true;
    f2 with (msg : string) :
      msg = "InvalidState" and
      state <> Activated;
  }
  postcondition p1 {
    let some v = voter[caller] in
    let some bv = before.voter[caller] in
      v.remaining = bv.remaining - weight
    otherwise true otherwise true
  }
  postcondition p2 {
    let some i = idea[n] in
    let some bi = before.idea[n] in
      i.nbvotes = bi.nbvotes + weight
    otherwise true otherwise true
  }
}

specification entry terminate () {
  postcondition p3 {
    before.state = Activated ->
    selected.count() <= 3
  }
  postcondition p4 {
    before.state = Activated ->
    forall s in selected,
      let some i = idea[s.sid] in
        i.nbvotes > maxvotes and
        forall o in idea,
          not selected.contains(o.id) ->
          o.nbvotes <= i.nbvotes
      otherwise false
  }
}
```

</TabItem>

</Tabs>