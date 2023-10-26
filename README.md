# Supply Chain Management (SCM)

## Overview

The Supply Chain Management (SCM) using a Smart Contract is designed to streamline and automate various aspects of the supply chain on the Ethereum blockchain. It serves as a foundational tool for managing the flow of goods and resources from suppliers to consumers with transparency and efficiency.

## Purpose

The primary objectives of the SCM Smart Contract are as follows:

- **Transparency**: Provide a transparent and immutable record of all supply chain activities to reduce fraud and disputes.
- **Efficiency**: Automate tasks to reduce manual intervention, minimize errors, and expedite the flow of goods.
- **Accountability**: Define roles and responsibilities for each participant in the supply chain, enhancing accountability.
- **Secure Transactions**: Secure all transactions and approvals through cryptographic mechanisms.
- **Inventory Management**: Track inventory levels accurately so that each participant knows the status of available resources.
- **Request and Approval Process**: Manage the process of requesting and approving supplies, ensuring proper validation and record-keeping.

## Contract Structure

The SCM Smart Contract is structured as follows:

1. **Data Structures**: It defines two primary data structures: `requested` for supply requests and `loginDetails` for user information.

2. **State Variables**: Various state variables, including mappings, store user details, divisions, and other relevant information. Manufacturer and Supply Manager IDs are also stored.

3. **Constructor**: The constructor initializes the contract's state by creating user accounts and setting initial values.

4. **Functions**: The contract provides functions to facilitate user logins, account creation, inventory management, supply request approval, and interactions within the supply chain.

5. **View and Utility Functions**: Several view functions allow users to retrieve specific information, while utility functions assist in contract management.

## Usage

To use the SCM Smart Contract, follow these steps:

1. Deploy the contract on the Ethereum blockchain.
2. Interact with the contract by creating accounts and managing inventory.
3. Handle supply requests, approvals, and interactions within the supply chain using the provided functions.

The contract simplifies and automates various supply chain management processes, making it a valuable tool for supply chain optimization.

## Disclaimer

Please note that the contract presented here is a simplified educational version. For real-world supply chain management systems, the contract should be further enhanced, secured, and customized to specific business requirements.
