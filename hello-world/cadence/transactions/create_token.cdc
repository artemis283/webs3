import MintyToken from 0xf8d6e0586b0a20c7

transaction {

    /// `auth(SaveValue) &Account` signifies an account object
    /// that has the `SaveValue` authorization entitlement, which means
    /// that this transaction can't do anything with the &Account object
    /// besides saving values to storage.
    /// You will learn more about entitlements later
	prepare(acct: auth(SaveValue) &Account) {
        // Here we create a resource and move it to the variable newHello,
        // then we save it in the signer's account storage
        let newHello <- MintyToken.createMintyToken()

        acct.storage.save(<-newHello, to: /storage/HelloAssetTutorial)
  }

    // In execute, we log a string to confirm that the transaction executed successfully.
	execute {
        log("Saved Hello Resource to account.")
	}
}