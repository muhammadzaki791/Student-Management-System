import inquirer from "inquirer";
import chalk from "chalk";
const ranNum = Math.floor(10000 + Math.random() * 90000);
let balance = 0;
let exit = false;
while (!exit) {
    let input = await inquirer.prompt([
        {
            name: "student",
            type: "input",
            message: chalk.rgb(255, 165, 0)("Enrole a student name :"),
            validate: function (val) {
                if (val.trim() !== "") {
                    return true;
                }
                return chalk.italic.bgBlack.bold.redBright("Error: Dont enter a empty value.");
            },
        },
        {
            name: "Courses",
            type: "list",
            message: chalk.rgb(255, 165, 0)("Select one of the course to be enroled "),
            choices: ["PHP", "Typescript", "HTML", "Css", "Python"],
        },
    ]);
    const CoursesFee = {
        PHP: 5000,
        Typescript: 4000,
        HTML: 2500,
        Css: 5000,
        Python: 4500,
    };
    console.log(chalk.blue(`Course Fees is: ${CoursesFee[input.Courses]}`));
    console.log(chalk.yellow(`Your Balance is: ${balance}\n`));
    let paymentMethod = await inquirer.prompt([
        {
            name: "Payment",
            type: "list",
            message: chalk.rgb(255, 165, 0)("Select a payment method: "),
            choices: ["Bank Transfer", "Easypaisa", "Jazzcash"]
        },
        {
            name: "amount",
            type: "list",
            message: chalk.rgb(255, 165, 0)(("Select a amount of money you want ot transfer:")),
            choices: [2500, 4000, 4500, 5000],
            validate: function (val) {
                if (val.trim() !== "") {
                    return true;
                }
                return chalk.italic.bgBlack.bold.redBright("Error: Dont enter a empty value.");
            },
        }
    ]);
    const Fees = CoursesFee[input.Courses];
    const paymentamount = parseFloat(paymentMethod.amount);
    if (Fees <= paymentamount) {
        console.log(`Congratulation, you have successfully enrolled in ${input.Courses}`);
        let ans = await inquirer.prompt([
            {
                name: "selection",
                type: "list",
                message: chalk.rgb(255, 165, 0)("What would you like to do next: "),
                choices: ["View Status", "Exit"]
            }
        ]);
        if (ans.selection === "View Status") {
            console.log(chalk.italic.bgBlack.bold.redBright("\n-*-*-*-*Status*-*-*-*-\n"));
            console.log(chalk.yellow(`Student Name: ${input.student}`));
            console.log(chalk.yellow(`Student ID: ${ranNum}`));
            console.log(chalk.yellow(`Course Enroled: ${input.Courses}`));
            console.log(chalk.yellow(`Tution Fees Paid: ${Fees}`));
            console.log(chalk.yellow(`Balance: ${balance + paymentMethod.amount - Fees}`));
        }
        else if (ans.selection === "Exit") {
            console.log(chalk.italic.bgBlack.bold.redBright("\nExiting Student Management System\n"));
            exit = true;
        }
    }
    else {
        console.log("You dont have enough Balance.");
    }
}
