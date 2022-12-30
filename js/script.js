//!  Selectors
let btn = document.querySelector('button')
let input = document.querySelector('input')
let div = document.querySelector('.container')

btn.addEventListener('click', function(){

    // Get input Value
    let city = input.value;

    if(city==''){
        alert('Por favor, ingresa el nombre de la ciudad en el campo de texto.');
        div.style.opacity = 0
    }else if(city.toLowerCase() == "cdmx"){
        alert("Recuerde que 'CDMX' debe escribirse como 'Ciudad de México'.");
        div.style.opacity = 0
        input.value = ''
    }else{
        input.value = ''

        // API
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=fdd533266e28101881f610f2b8f1ebe1", function(data){
            div.style.opacity = 1
            console.log(data)

            //? Temperature
            let dataTemp = parseInt(data.main.temp - 273.15)
            console.log(`Temperatura: ${dataTemp} °C`)
            document.querySelector('#temperatura').textContent = dataTemp 

            document.querySelector('#grados').innerHTML = '<sup>°C</sup>' 

            //!  Access Array Weather 
            let weather = data.weather
            let descrip = weather[0]  //? Access array

            //? Weather description
            document.querySelector('#descripcion').textContent = descrip.description
            console.log(`Descripción: ${descrip.description}`)

            //? Weather Image
            let icone = document.querySelector('#wicon')
            icone.src = "https://openweathermap.org/img/wn/" + descrip.icon + ".png"
        }).fail(function(jqXHR, textStatus, errorThrown){
            if(jqXHR.status == 404){
                alert("Lo sentimos, no encontramos la ciudad que ingresaste. Por favor, verifica que hayas escrito correctamente el nombre de la ciudad y vuelve a intentarlo.");
                div.style.opacity = 0
            }
        });
    }
    document.querySelector(".container").style.visibility = "visible"
    document.querySelector('#ciudad').textContent = city
})
