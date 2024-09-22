access(all) contract MintyToken {

    // Declare a resource that only includes one function.
    access(all) resource MintyTokenResource {
                // Declare the size field
        access(all) var size: Int

        init(size: Int) {
            // Initialize the size field with the provided value
            self.size = size
        }
        access(all) view fun hello(): Int {
            return self.size
        }
    }

    access(all) fun createMintyToken(size: Int): @MintyTokenResource {
        // Pass the size to the resource constructor
        return <-create MintyTokenResource(size: size)
    }
}