![Overcoming OpenAPI 2.0 `multi` CollectionFormat Challenges in Power Automate Custom Connectors](https://github.com/rwilson504/Blogger/assets/7444929/02ae64d9-15d4-4e94-9d7f-f33f85b56450)

Integrating APIs into Power Automate flows often requires creating custom connectors, a process that can encounter challenges with certain API specifications. Specifically, the OpenAPI 2.0 specification allows array and multi-value parameters to be passed in various formats, including the `multi` collection format. This format is particularly troublesome for Power Automate's Custom Connector wizard, which does not support it natively. This article outlines the issue and provides a detailed workaround using custom code components and modifying input parameters, ensuring seamless API integration.

## The Challenge with `multi` CollectionFormat

The OpenAPI 2.0 specification introduces several collection formats for array parameters, with `multi` being one of them. This format allows multiple values for the same parameter to be passed by repeating the parameter's name in the query string, which is not directly supported in Power Automate Custom Connectors. Attempting to import an OpenAPI specification using the `multi` format results in an error, blocking the creation of the custom connector and hindering integration efforts.

## Error Encountered

Developers face a specific error when the Custom Connector wizard encounters a `multi` collection format:

```
Error: paths/~1v1~1preview~1records~1person/get/parameters/1/collectionFormat: The 'collectionFormat' keyword value 'Multi' is not supported.
```

This error signifies the inability of the wizard to process the specified collection format, necessitating a workaround to proceed with the connector creation.

## A Workaround

### Step 1: Modifying Parameter Types from Array to String

The first part of the workaround involves changing the input parameters' types in the OpenAPI definition from arrays to strings. This modification aims to bypass the Custom Connector wizard's limitations by allowing the input of multiple values in a single, comma-separated string.

#### Original Array Parameter Definition

```json
{
  "collectionFormat": "multi",
  "description": "List of services to filter facilities by the services they offer.",
  "x-ms-summary": "Services Offered",
  "in": "query",
  "items": {
    "type": "string"
  },
  "name": "services[]",
  "type": "array"
}
```

#### Modified String Parameter Definition

```json
{
  "description": "A comma-separated list of services to filter facilities by the services they offer.",
  "x-ms-summary": "Services Offered",
  "in": "query",
  "name": "services[]",
  "type": "string"
}
```

### Step 2: Leveraging Custom Code Components

To handle the modified string parameters correctly and support the original intention of passing multiple values, custom code components within the connector are utilized. These components programmatically adjust the request's query string, ensuring that the API receives the parameters in the expected `multi` format.

For detailed guidance on writing code for Power Automate Custom Connectors, visit [Microsoft's official documentation](https://learn.microsoft.com/en-us/connectors/custom-connectors/write-code).

#### Custom Code Example

```csharp
public class Script : ScriptBase
{
    private readonly Dictionary<string, string[]> specialHandlingMap = new Dictionary<string, string[]>
    {
        { "GetFacilities", new[] { "facilityIds", "services[]", "bbox[]" } },
        { "GetFacilityServicesById", new[] { "serviceIds" } },
        { "GetNearbyFacilities", new[] { "services[]" } }
    };

    public override async Task<HttpResponseMessage> ExecuteAsync()
    {
        var operationId = this.Context.OperationId;
        if (specialHandlingMap.TryGetValue(operationId, out var queryParamNames))
        {
            var query = HttpUtility.ParseQueryString(this.Context.Request.RequestUri.Query);
            foreach (var paramName in queryParamNames)
            {
                if (query.AllKeys.Contains(paramName))
                {
                    var values = query[paramName].Split(',').Select(value => value.Trim()).ToArray();
                    query.Remove(paramName);
                    foreach (var value in values)
                    {
                        query.Add(paramName, value);
                    }
                }
            }

            var uriBuilder = new UriBuilder(this.Context.Request.RequestUri) { Query = query.ToString() };
            this.Context.Request.RequestUri = uriBuilder.Uri;
        }

        return await this.Context.SendAsync(this.Context.Request, this.CancellationToken).ConfigureAwait(false);
    }
}
```

![Image of Custom Connector Code Step](https://github.com/rwilson504/Blogger/assets/7444929/5b05e8ba-7a08-4897-9ab4-f6d1fe6bc710)

### Importance of Descriptive Parameter Descriptions

Adjusting the parameter types necessitates clear and descriptive parameter descriptions to guide users on the correct input format. Descriptions like "A comma-separated list of services..." ensure users understand how to format their input, enhancing usability and reducing errors.

## Conclusion

By modifying the OpenAPI definition to change parameter types from arrays to strings and utilizing custom code components within Power Automate Custom Connectors, developers can overcome the limitations posed by the lack of support for the `multi` collection format. This comprehensive workaround ensures that custom connectors remain a powerful tool for integrating a wide range of APIs into Power Automate flows, even when facing complex parameter formatting challenges.
