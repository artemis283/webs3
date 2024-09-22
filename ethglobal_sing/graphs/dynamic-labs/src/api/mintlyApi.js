export const makePurchase = async (amount, partner, userAddress) => {
  const response = await fetch('/purchase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, partner, userAddress }),
  });
  if (!response.ok) throw new Error('Purchase failed');
  return await response.json();
};

export const getBalance = async (userAddress) => {
  const response = await fetch(`/balance/${userAddress}`);
  if (!response.ok) throw new Error('Failed to fetch balance');
  return await response.json();
};

export const redeemPoints = async (amount, userAddress) => {
  const response = await fetch('/redeem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, userAddress }),
  });
  if (!response.ok) throw new Error('Redemption failed');
  return await response.json();
};
