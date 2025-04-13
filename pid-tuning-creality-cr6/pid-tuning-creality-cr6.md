## Fixing Temperature Fluctuations on the Creality CR-6 SE with PID Tuning

![image](https://github.com/user-attachments/assets/2b63e991-24f1-490d-a80f-5b33f609f076)

After installing a new hotend on my **Creality CR-6 SE**, I ran into a frustrating issue: when printing above 210°C, the hotend temperature would swing wildly—fluctuating by 5–10°C. The printer wouldn’t even start the print due to this instability.

### 🧠 The Fix: PID Tuning (Thanks to Community Firmware)

This issue led me to discover **PID tuning**, a way to calibrate how the printer regulates temperature using smarter controls. Out of the box, Creality’s firmware doesn’t always support this—but I’m running the excellent **[CR-6 SE Community Firmware](https://github.com/CR6Community/Marlin)** based on Marlin, which includes **PID autotuning support** via G-code commands.

### 🔧 How to Tune the Hotend Using OctoPrint

1. Open the **Terminal tab** in OctoPrint.

   ![image](https://github.com/user-attachments/assets/33200617-3dae-4a85-a20d-776f5d7e93d3)

2. **Turn on the cooling fan** before tuning for accuracy, if you typically run the fan during your prints:

   ```
   M106 S255
   ```

3. Run PID autotune at a typical print temp (I used **215°C** with 10 cycles):

   ```
   M303 E0 S215 C10
   ```

4. After sending the `M303` command, you'll see a series of output logs in the terminal as the firmware performs multiple test cycles. Each cycle includes temperature data and candidate PID values.

   Look for a section similar to this near the end of the output:

   ```
   Recv:  bias: 137 d: 117 min: 208.7500 max: 222.1429 Ku: 22.2460 Tu: 30.7830
   Recv:  Classic PID
   Recv:  Kp: 13.3476 Ki: 0.8672 Kd: 51.3600
   Recv: PID Autotune finished! Put the last Kp, Ki and Kd constants from below into Configuration.h
   Recv: #define DEFAULT_Kp 13.3476
   Recv: #define DEFAULT_Ki 0.8672
   Recv: #define DEFAULT_Kd 51.3600
   ```

   > ✅ **Important:** Use the **last set of ****`Kp`****, ****`Ki`****, and ****`Kd`**** values** from the output. These are the optimized values to set in the next step.

5. Apply and save the values using:

   ```
   M301 P13.3476 I0.8672 D51.3600
   M500
   ```

This sets and saves the new hotend PID values to your printer’s EEPROM.

### 🔥 Want to Tune Your Heated Bed Too?

You can tune your heated bed the same way, just use `E-1` instead of `E0`. For example:

```
M303 E-1 S60 C10
```

Then apply the values with:

```
M304 P30.93 I2.13 D299.02
M500
```

---

### ✅ Final Thoughts

Switching to the [CR-6 SE Community Firmware](https://github.com/CR6Community/Marlin) opened the door to making this kind of fine-tuning possible. After running PID tuning, my hotend holds temperature within ±1°C, prints kick off right away, and layer consistency has improved.

> 🔁 Don’t forget: jot down your **original PID values** in case you need to roll back.

If you’re using a CR-6 SE and have upgraded your hotend—or just want tighter temperature control—I highly recommend giving PID tuning a try.

