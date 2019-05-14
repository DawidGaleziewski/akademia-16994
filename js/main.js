// Variables
const btnCalc = document.getElementById('oblicz');
const studentsArray = document.querySelectorAll('[id^=uczen]')

// function increaing average if student has attended extra ciriculum
const awardExtraCurricular = (studentDiv) => {
    // only calculate if student attended extracurricular
    if(studentDiv.querySelector('.zajecia-dodatkowe').value !==""){

        console.log()
        // get value from input and trim it to result in array of subjects without white spaces
        const extraCurricular = studentDiv.querySelector('.zajecia-dodatkowe').value.replace(/\s/g, '').split(',');
        console.log(extraCurricular)

        // for each subject calculate new value

        extraCurricular.forEach(subjectName =>{
            // find this subjects current value
            const subjectGrade = studentDiv.querySelector(`.${subjectName}`);
            let newGrade = Number(subjectGrade.value) + 0.5;

            // make sure this does not rise grade above 6
            if(newGrade> 6){
                newGrade= 6
            }

            subjectGrade.value = newGrade;

            // add color to the subjects upgraded thanks to additional cirriculum
            subjectGrade.classList.add('extra-curricular-bosted')
        })

    }

}

// Mark best and worst (grade < 2 and grade> 4.75)
const markBest = (averege, studentDiv) =>{

    if(averege>= 4.75){
        studentDiv.classList.add('prodigy')
    }
}

// Mark those that wont pass
const markWorst = (grade, studentDiv) =>{
    if(grade < 2){
        studentDiv.classList.add('indanger');
    }
}


// function calculating averege for single student
const calcAverage = (studentDiv) => {
    const allGrades = studentDiv.querySelectorAll('[type=number]');
    let averageSpan = studentDiv.querySelector('.srednia');
   
    // console.log(allGrades[0].value);

    let averege = 0;

    awardExtraCurricular(studentDiv);

    // loop thru all subjects and add them, divide by number of those
    allGrades.forEach(subject=>{
        const grade = Number(subject.value);
        // console.log(grade)
        averege += grade;

        // Mark those who will not pass, 
        // markWorst(grade)
        markWorst(grade, studentDiv)
    })

    // calculate the final average
    averege /= allGrades.length
    console.log(averege)
    // round the avg
    averege = averege.toFixed(2)

    // update the site with new value
    averageSpan.textContent = averege;

    // mark best students
    markBest(averege, studentDiv)
}

// loop thru all students
const calcAllStudents = () =>{
    studentsArray.forEach((student)=> {
        calcAverage(student);
    })
}

// add the whole logic to the button
btnCalc.addEventListener('click', ()=>{
    calcAllStudents();
})


