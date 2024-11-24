graph TD
    A[User Access] --> B{Authentication}
    B --> C[Admin Dashboard]
    B --> D[Student Dashboard]
    
    C --> E[Analytics]
    C --> F[Bulk Operations]
    C --> G[Reports]
    
    D --> H[Payment Methods]
    D --> I[Payment History]
    D --> J[Notifications]
    
    H --> K[GCash]
    H --> L[PayMaya]
    H --> M[Bank Transfer]
    H --> N[Card Payment]