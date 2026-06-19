const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

let formData = { email: "", message: "" };

populateFormFields();
form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

function handleFormInput(event) {
    const { name, value } = event.target;
    formData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleFormSubmit(event) {
    event.preventDefault();
    if (formData.email === "" || formData.message === "") {
        alert("Fill please all fields.");
        return;
    }
    console.log("Form submitted with data:", formData);
    localStorage.removeItem(STORAGE_KEY);
    event.currentTarget.reset();
    formData = { email: "", message: "" };
}

function populateFormFields() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      
      // Оновлюємо наш глобальний об'єкт formData збереженими даними
      formData = { ...formData, ...parsedData };

      // Заповнюємо значеннями інпути у формі (якщо вони існують у збережених даних)
      if (parsedData.email) form.elements.email.value = parsedData.email;
      if (parsedData.message) form.elements.message.value = parsedData.message;
      
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
    }
    }
}