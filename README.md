##  Remote Control Motor with Telegram and Web Interface

This project allows you to control a DC motor remotely using a Telegram bot or a web interface (not included in this code). 

###  Features

* Control motor direction and speed through Telegram commands.
* Set different motor speed patterns.
* Monitor motor status through Telegram.

###  Hardware Requirements

* Arduino Uno or compatible board
* DC Motor
* Motor Driver (based on your motor specs)
* LED (optional)

###  Knowledge Requirements

* Arduino IDE ([https://www.arduino.cc/en/Guide/Windows](https://www.arduino.cc/en/Guide/Windows))
* Telegram Bot ([https://core.telegram.org/bots/tutorial](https://core.telegram.org/bots/tutorial)) (optional)
* NodeJS + ReactJS

###  Connection

1. Connect your motor driver to the Arduino following the driver's instructions.
2. Connect the motor to the motor driver's outputs.
3. (Optional) Connect an LED to the LED pin for visual indication.

**Wire Reference:**

* `motorPin1`:  Connect to motor driver pin 1 (refer to driver datasheet)
* `motorPin2`:  Connect to motor driver pin 2 (refer to driver datasheet)
* `pwmPin`:  Connect to motor driver PWM pin (refer to driver datasheet)
* `ledPin` (Optional): Connect to the positive leg of the LED with a current limiting resistor in series. Connect the negative leg to ground.


###  Using the Telegram Bot (Optional)

1. Create a Telegram bot using the BotFather ([https://core.telegram.org/bots/tutorial](https://core.telegram.org/bots/tutorial)).
2. Find the bot token from the bot creation process.
3. Update the code with your bot token in the appropriate location (not provided in this example).
4. In Telegram, search for your bot and send commands to control the motor.

**Telegram Commands:**

* `ON`: Turns the motor on.
* `OFF`: Turns the motor off.
* `PWM:<value>`: Sets the motor speed (0-255).
* `PATTERN<number>`: Runs a specific motor pattern (1-5).

###  Compiling and Uploading

1. Download the code and open it in the Arduino IDE.
2. Update the bot token (if using Telegram) and any other configurations as needed.
3. Select your Arduino board and serial port from the IDE.
4. Compile and upload the code to your Arduino board.

###  Web Interface (Not Included)

This code provides the core functionality for motor control. To implement a web interface, you'll need a web server library like WiFi or Ethernet. The library will allow you to create a webpage for controlling the motor through a web browser.

###  Motor Patterns

The code includes five pre-defined motor patterns:

1. **Pattern 1:** Simple on/off cycle with adjustable speed.
2. **Pattern 2:** Fades the motor speed up and down.
3. **Pattern 3:** Short bursts of motor power at a set speed.
4. **Pattern 4:** Random speed and duration bursts.
5. **Pattern 5:** Gradually increases motor speed to a set point and then returns to low speed.

###  License

This code is provided under an MIT license. Refer to the LICENSE file for details.

### Speacil
Documentation is not complete.
