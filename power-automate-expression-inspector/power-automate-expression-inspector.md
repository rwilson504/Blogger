![Copy Hidden Power Automate Expressions](https://github.com/user-attachments/assets/47b4c591-c27b-4594-b84e-c0b01e1b22b2)

While recently walking a colleague through Power Automate, I was reminded of one of my long-standing frustrations: how difficult it is to copy expressions once they’ve been inserted into actions like a `Compose`, `Filter Array`, or `For Each`. For example:

```powerautomate
workflow()['tags']['environmentName']
item()?['logicalName']
```

Once fields are wrapped in certain expressions or are in certain actions, you can no longer open them in the expression popup—you or easily copy them out to reuse elsewhere. That makes it frustrating when you want to replicate logic in another flow or simply document what you’ve written. There is a copy action functionality but that copies the entire action and sometimes you just want a specific expression.

![Power Automate Expression Inspector](https://github.com/user-attachments/assets/ecb40951-2545-4c3c-b0e1-a554fbe9bb51)

### The Workaround (Until Now)

To deal with this, I used to:

- Add expressions to a **comment or note** in the action so I could reference them later
- Open DevTools and **inspect the DOM** to grab the full `title` attribute that contains the expression

But neither of these approaches felt elegant. And since I work in the public sector, I can’t use browser extensions like a typical Power Platform developer might.

### Bookmarklets to the Rescue

This reminded me of the old-school technique of using bookmarklets to extract information from web apps—something I used to do to grab entity IDs in Dynamics CRM. That got me thinking: why not use a bookmarklet or browser snippet to extract expressions in Power Automate?

So I built exactly that: a JavaScript snippet that works with **both the classic and new editors** in Power Automate.

### Requirements

- This tool only works when editing flows directly at [https://make.powerautomate.com](https://make.powerautomate.com)
- It will **not** work if you're in [https://make.powerapps.com](https://make.powerapps.com), because flows open in an iframe hosted on a different domain—which introduces cross-origin browser restrictions

## Where This Is Useful

This tool is great when you're:

- Migrating expressions between flows
- Refactoring actions and need to reference earlier logic
- Working in shared environments and need to document flows
- Reviewing or debugging large flows with embedded expressions

## How It Works

The script listens for clicks on expression tokens within the flow designer. Once you click a token, it pops open a dialog with:

- The full expression
- A "Copy" button
- A "Copy & Close" button
- A "Close" button
- And a "Turn Off" button to disable the click handler when you’re done

It supports:

- **v2 (classic editor)** by inspecting the `title` attribute on legacy token spans
- **v3 (new editor)** by locating the tooltip element associated with the clicked field

## How to Use It

### Option 1: Bookmarklet

1. Create a new bookmark in your browser
2. Edit the bookmark URL and paste the following code:

```javascript
javascript:(function(){const e=new URLSearchParams(window.location.search).get("v3"),t=null===e||"true"===e;function n(e){const t=document.getElementById("expression-dialog");t&&t.remove();const n=document.createElement("div");n.id="expression-dialog",n.style.cssText="position: fixed; top: 20%; left: 50%; transform: translateX(-50%); background: white; border: 2px solid #0078d4; padding: 20px; z-index: 99999; box-shadow: 0 4px 12px rgba(0,0,0,0.2); font-family: sans-serif; border-radius: 8px; min-width: 400px;",n.innerHTML=`<div style="margin-bottom: 10px; font-weight: bold;">Power Automate Expression</div><input type="text" id="expression-input" value="${e.replace(/"/g,"&quot;")}" style="width: 100%; padding: 8px; font-size: 14px;" readonly /><div style="margin-top: 10px; text-align: right;"><button id="turnoff-btn" style="margin-right: 10px;">Turn Off</button><button id="copy-btn" style="margin-right: 10px;">Copy</button><button id="close-btn" style="margin-right: 10px;">Close</button><button id="copy-close-btn">Copy & Close</button></div>`,document.body.appendChild(n);const o=document.getElementById("expression-input");o.focus(),o.select(),document.getElementById("copy-btn").onclick=()=>{navigator.clipboard.writeText(e).then(()=>{const e=document.getElementById("copy-btn");e.innerText="Copied!",setTimeout(()=>e.innerText="Copy",1500)})},document.getElementById("copy-close-btn").onclick=()=>{navigator.clipboard.writeText(e).then(()=>{n.remove()})},document.getElementById("close-btn").onclick=()=>n.remove(),document.getElementById("turnoff-btn").onclick=()=>{t?document.removeEventListener("click",r,!0):document.removeEventListener("click",c,!0),n.remove(),alert("Expression click handler turned off.")}}function c(e){"SPAN"===e.target.tagName&&(e.preventDefault(),e.stopPropagation(),e=e.target.parentElement?.parentElement,e&&e.classList.contains("msla-token")&&n(e.title||"(no title found)"))}function r(e){"DIV"===e.target.tagName&&(e=e.target.closest('span[data-automation-id^="flow-token"]'),e&&(e=e.getAttribute("aria-labelledby")||e.getAttribute("aria-describedby"),e=document.getElementById(e)?.querySelector("span")?.textContent?.trim())&&(event.preventDefault(),event.stopPropagation(),n(e)))}t?(alert("Click on any token in the new editor (v3) to extract the expression. You can keep clicking."),document.addEventListener("click",r,!0)):(alert("Click on any expression token (v2) to extract the expression. You can keep clicking."),document.addEventListener("click",c,!0))})();
```
3. Navigate to [https://make.powerautomate.com](https://make.powerautomate.com), open your flow, and click the bookmark
4. Then click on any tokenized expression to extract it!

### Option 2: DevTools Snippet

1. Open your flow in Power Automate (must be at `make.powerautomate.com`)
2. Press `F12` to open Developer Tools
3. Go to the **"Sources"** tab
4. Choose the **"Snippets"** pane and click **"New snippet"**
5. Paste in the full script
6. Right-click the snippet and choose **"Run"**

  Here is the full code:
```javascript
// Combined widget for both v2 and v3 Power Automate editors
(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const v3Param = urlParams.get("v3");
  const isV3 = v3Param === null || v3Param === "true";

  function handleClickV2(e) {
    if (e.target.tagName !== "SPAN") return;
    const token = e.target.parentElement?.parentElement;
    if (!token || !token.classList.contains("msla-token")) return;

    e.preventDefault();
    e.stopPropagation();

    const expression = token.title || "(no title found)";
    showDialog(expression);
  }

  function handleClickV3(e) {
    if (e.target.tagName !== "DIV") return;
    let token = e.target.closest('span[data-automation-id^="flow-token"]');
    if (!token) return;

    const describedById = e.target.getAttribute("aria-labelledby") || e.target.getAttribute("aria-describedby");
    if (!describedById) return;

    const tooltipEl = document.getElementById(describedById);
    const expression = tooltipEl?.querySelector('span')?.textContent?.trim();
    if (!expression) return;

    e.preventDefault();
    e.stopPropagation();

    showDialog(expression);
  }
  
  function showDialog(expression) {
    const existing = document.getElementById("expression-dialog");
    if (existing) existing.remove();

    const dialog = document.createElement("div");
    dialog.id = "expression-dialog";
    dialog.style.cssText = `
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      border: 2px solid #0078d4;
      padding: 20px;
      z-index: 99999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      font-family: sans-serif;
      border-radius: 8px;
      min-width: 400px;
    `;

    dialog.innerHTML = `
      <div style="margin-bottom: 10px; font-weight: bold;">Power Automate Expression</div>
      <input type="text" id="expression-input" value="${expression.replace(/"/g, '&quot;')}" style="width: 100%; padding: 8px; font-size: 14px;" readonly />
      <div style="margin-top: 10px; text-align: right;">
        <button id="turnoff-btn" style="margin-right: 10px;">Turn Off</button>
        <button id="copy-btn" style="margin-right: 10px;">Copy</button>
        <button id="close-btn" style="margin-right: 10px;">Close</button>
        <button id="copy-close-btn">Copy & Close</button>
      </div>
    `;

    document.body.appendChild(dialog);

    const input = document.getElementById("expression-input");
    input.focus();
    input.select();

    document.getElementById("copy-btn").onclick = () => {
      navigator.clipboard.writeText(expression).then(() => {
        const btn = document.getElementById("copy-btn");
        btn.innerText = "Copied!";
        setTimeout(() => btn.innerText = "Copy", 1500);
      });
    };

    document.getElementById("copy-close-btn").onclick = () => {
      navigator.clipboard.writeText(expression).then(() => {
        dialog.remove();
      });
    };

    document.getElementById("close-btn").onclick = () => dialog.remove();

    document.getElementById("turnoff-btn").onclick = () => {
      if (isV3) {
        document.removeEventListener("click", handleClickV3, true);
      } else {
        document.removeEventListener("click", handleClickV2, true);
      }
      dialog.remove();
      alert("Expression click handler turned off.");
    };
  }

  if (isV3) {
    alert("Click on any token in the new editor (v3) to extract the expression. You can keep clicking.");
    document.addEventListener("click", handleClickV3, true);
  } else {
    alert("Click on any expression token (v2) to extract the expression. You can keep clicking.");
    document.addEventListener("click", handleClickV2, true);
  }
})();
```

Once active, simply click any expression token in the designer to see the popup.

---

