import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  OffChainSignType,
} from '@ethsign/sp-sdk';
import { privateKeyToAccount } from 'viem/accounts';
const privateKey = '0xabc'; // optional
const client = new SignProtocolClient(SpMode.OffChain, {
  signType: OffChainSignType.EvmEip712,
  account: privateKeyToAccount(privateKey), // optional
});

//create schema
const schemaInfo = await client.createSchema({
  name: 'xxx',
  data: [{ name: 'name', type: 'string' }],
});

//create attestation
const attestationInfo = await client.createAttestation({
  schemaId: 'xxxx', //schemaInfo.schemaId or other schemaId
  data: { name: 'a' },
  indexingValue: 'xxx',
});

//revoke attestation
const attestationId = 'xxx';
const revokeAttestationRes = await client.revokeAttestation(attestationId, {
  reason: 'test',
});
