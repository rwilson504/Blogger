![Set Your Preferred Solution for the Dataverse MCP](https://github.com/rwilson504/Blogger/blob/master/dataverse-mcp-preferred-solution/hero-image.png?raw=true)

I was working with the [Dataverse MCP server](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-mcp) yesterday and noticed that when I created new tables through it, they were all getting the default `cr***` prefix from the Common Data Services Default Publisher. The MCP doesn't give you an option to select a publisher or a prefix when creating table customizations — it just uses whatever the environment default is.

If you're like me and want your tables to have a consistent, meaningful prefix tied to your own publisher, there's a simple fix: **set a Preferred Solution**.

## What's a Preferred Solution?

By default, any customizations you make outside the context of a specific solution land in the **Common Data Services Default Solution**. The publisher on that solution has a randomly assigned prefix, so your tables end up with names like `cr8a3_project` instead of something clean like `contoso_project`.

When you set a [Preferred Solution](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/preferred-solution), any new objects you create — including tables created through the Dataverse MCP — automatically use the publisher and prefix from that solution. No extra configuration needed on the MCP side.

## Setting Your Preferred Solution

You can set your preferred solution in two ways.

### Option 1: When Creating a New Solution

When you [create a new solution](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-solution), there's a checkbox right on the creation form to **Set as your preferred solution**. Just check it and you're good to go.

![Set preferred solution when creating a new solution](https://github.com/rwilson504/Blogger/blob/master/dataverse-mcp-preferred-solution/preferred-on-create.png?raw=true)

### Option 2: From the Solutions List

If you already have a solution you'd like to use, go to the **Solutions** area in [Power Apps](https://make.powerapps.com), select your unmanaged solution, and click **Set preferred solution** on the command bar.

![Set preferred solution from the solutions grid](https://github.com/rwilson504/Blogger/blob/master/dataverse-mcp-preferred-solution/set-preferred-on-grid.png?raw=true)

Once it's set, you'll see a **preferred solution** indicator in the Solutions area confirming which solution is active.

## That's It

Now when you create tables through the [Dataverse MCP](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-mcp), they'll automatically get the prefix from your preferred solution's publisher. No need to rename anything after the fact or manually move tables between solutions.

For more details on preferred solutions and solution publishers, check out these Microsoft Learn articles:

- [Set the preferred solution](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/preferred-solution)
- [Create a solution](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-solution)
- [Dataverse MCP server overview](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-mcp)

Give it a try — it's a small change that keeps your environment clean from the start!
