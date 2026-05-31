## ADDED Requirements

### Requirement: Browser Shell and Service Worker Registration
The system SHALL run as a browser ES module application and SHALL attempt to register `service-worker.js` on window load when service workers are supported, while continuing to function if registration fails.

#### Scenario: Registration success or failure tolerance
- **WHEN** the app loads in a browser with service worker support
- **THEN** it attempts registration and gameplay remains functional even if registration throws an error.

### Requirement: Manifest and Core Asset Declaration
The system SHALL provide a web app manifest that declares app metadata and image assets located under `assets/images/`.

#### Scenario: Manifest image path convention
- **WHEN** manifest icons or image references are declared
- **THEN** referenced image files use paths under `assets/images/`.

### Requirement: Cache-First Offline Behavior
The service worker SHALL cache declared core app assets during install/activate and SHALL return cached responses when available before falling back to network retrieval.

#### Scenario: Cached asset request
- **WHEN** a request matches an asset that is present in the service-worker cache
- **THEN** the cached response is returned without requiring network success.
