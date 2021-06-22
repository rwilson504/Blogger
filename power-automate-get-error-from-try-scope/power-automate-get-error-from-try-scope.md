When utilizing scopes within Power Automate to create a try/catch/finally statement it can be useful to provide additional details about any errors that occured within the try block.  The example below shows how to get the results of a Try block after it has failed and return that information.

To replicate this do the following: 

- Add a **Control - Scope** action called 'Try'
- Add another **Control - Scope** action below Try called 'Catch'
- Click the (...) on the Catch action and select the **Configure after run settings**. Then click the 'has failed' checkbox.
- Follow the screen shot below which will get the results array of the Try block then filter it down to the Failed result.  You can then utilize the filtered result to return errors.

![2021-06-22_13-50-06](https://user-images.githubusercontent.com/7444929/122980038-37ba1900-d366-11eb-9283-b722ac24ebdd.png)

The iamge belows shows the output after a completed run.  We can now see the Action name which failed as well as the error message.  In this scenario I am using that information to populate a JSON object which will be used later for returning information back to a Power App.

![2021-06-22_13-59-51](https://user-images.githubusercontent.com/7444929/122977991-02143080-d364-11eb-8326-7cd42369dd68.png)

If you would like to return additional information from the Failed result here is schema for the result object.

```
{
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string"
            },
            "inputs": {
                "type": "object",
                "properties": {
                    "host": {
                        "type": "object",
                        "properties": {
                            "apiId": {
                                "type": "string"
                            },
                            "connectionReferenceName": {
                                "type": "string"
                            },
                            "operationId": {
                                "type": "string"
                            }
                        }
                    },
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "entityName": {
                                "type": "string"
                            },
                            "item/activitypointer_activity_parties": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "participationtypemask": {
                                            "type": "integer"
                                        },
                                        "partyid@odata.bind": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "participationtypemask",
                                        "partyid@odata.bind"
                                    ]
                                }
                            },
                            "item/description": {
                                "type": "string"
                            },
                            "item/subject": {
                                "type": "string"
                            }
                        }
                    }
                }
            },
            "outputs": {
                "type": "object",
                "properties": {
                    "statusCode": {
                        "type": "integer"
                    },
                    "headers": {
                        "type": "object",
                        "properties": {
                            "x-ms-service-request-id": {
                                "type": "string"
                            },
                            "Cache-Control": {
                                "type": "string"
                            },
                            "Set-Cookie": {
                                "type": "string"
                            },
                            "Strict-Transport-Security": {
                                "type": "string"
                            },
                            "REQ_ID": {
                                "type": "string"
                            },
                            "AuthActivityId": {
                                "type": "string"
                            },
                            "x-ms-ratelimit-time-remaining-xrm-requests": {
                                "type": "string"
                            },
                            "x-ms-ratelimit-burst-remaining-xrm-requests": {
                                "type": "string"
                            },
                            "OData-Version": {
                                "type": "string"
                            },
                            "X-Source": {
                                "type": "string"
                            },
                            "Public": {
                                "type": "string"
                            },
                            "Timing-Allow-Origin": {
                                "type": "string"
                            },
                            "Date": {
                                "type": "string"
                            },
                            "Content-Length": {
                                "type": "string"
                            },
                            "Allow": {
                                "type": "string"
                            },
                            "Content-Type": {
                                "type": "string"
                            },
                            "Expires": {
                                "type": "string"
                            }
                        }
                    },
                    "body": {
                        "type": "object",
                        "properties": {
                            "error": {
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "type": "string"
                                    },
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "startTime": {
                "type": "string"
            },
            "endTime": {
                "type": "string"
            },
            "trackingId": {
                "type": "string"
            },
            "clientTrackingId": {
                "type": "string"
            },
            "clientKeywords": {
                "type": "array",
                "items": {
                    "type": "string"
                }
            },
            "code": {
                "type": "string"
            },
            "status": {
                "type": "string"
            }
        },
        "required": [
            "name",
            "inputs",
            "outputs",
            "startTime",
            "endTime",
            "trackingId",
            "clientTrackingId",
            "clientKeywords",
            "code",
            "status"
        ]
    }
}
```
