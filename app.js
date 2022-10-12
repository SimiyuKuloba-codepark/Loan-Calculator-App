//get-elements
const submitBtn = document.querySelector('#form');

// add-event-listeners
submitBtn.addEventListener('submit', function(e){

  // hide-results 
  document.querySelector('#results').style.display ='none';

  // show-loader
  document.querySelector('#load').style.display ='block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});


// calculate-results
function calculateResults(){

  // get-UI-vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const time = document.querySelector('#time');
  const monthlyPayment = document.querySelector('#monthly');
  const total = document.querySelector('#total');
  const totalInterest = document.querySelector('#t-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 /12;
  const calculatedPayments = parseFloat(time.value) * 12;

  // compute-monthly-payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    total.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // show-results
    document.querySelector('#results').style.display ='block';

    // hide-loader
    document.querySelector('#load').style.display ='none';

  }else{
    showError('Please check your numbers');

    document.querySelector('#load').style.display ='none';
  }

}

// show-error
function showError(error){
  // create-div
  const errorDiv = document.createElement('div');

  // get elements
  const box = document.querySelector('.box-container');
  const heading = document.querySelector('.heading');

  // add-class
  errorDiv.className = 'alert danger';

  // create-text-node-and-append-todiv
  errorDiv.appendChild(document.createTextNode(error));

  // insert-error-into-box
  box.insertBefore(errorDiv, heading);

  // clear-error-after-3-seconds
  setTimeout(clearError, 3000);
}

// clear-error
function clearError(){
  document.querySelector('.alert').remove();
}