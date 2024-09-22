access(all) contract MintlyRewards {
    access(self) var purchases: {Address: {UInt64: Purchase}}
    access(self) var pointsBalances: {Address: UFix64}

    access(all) struct Purchase {
        access(all) let id: UInt64
        access(all) let amount: UFix64
        access(all) let partner: String
        access(all) let pointsEarned: UFix64

        init(id: UInt64, amount: UFix64, partner: String, pointsEarned: UFix64) {
            self.id = id
            self.amount = amount
            self.partner = partner
            self.pointsEarned = pointsEarned
        }
    }

    access(all) fun createPurchase(purchaser: Address, amount: UFix64, partner: String): UInt64 {
        let pointsEarned = amount * 0.05 // 5% of purchase amount as points

        let newPurchaseID = UInt64(self.purchases[purchaser]?.length ?? 0) + 1
        let newPurchase = Purchase(id: newPurchaseID, amount: amount, partner: partner, pointsEarned: pointsEarned)

        if self.purchases[purchaser] == nil {
            self.purchases[purchaser] = {newPurchaseID: newPurchase}
        } else {
            self.purchases[purchaser]!.insert(key: newPurchaseID, newPurchase)
        }

        self.pointsBalances[purchaser] = (self.pointsBalances[purchaser] ?? 0.0) + pointsEarned

        return newPurchaseID
    }

    access(all) fun getPointsBalance(account: Address): UFix64 {
        return self.pointsBalances[account] ?? 0.0
    }

    access(all) fun redeemPoints(redeemer: Address, amount: UFix64) {
        let currentBalance = self.pointsBalances[redeemer] ?? 0.0

        assert(currentBalance >= amount, message: "Insufficient points balance")

        self.pointsBalances[redeemer] = currentBalance - amount
        // Here you would typically transfer some reward or token to the user
    }

    init() {
        self.purchases = {}
        self.pointsBalances = {}
    }
}