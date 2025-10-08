//import { Interface } from 'readline';
import type { News, NewsContent } from 'src/interfaces/noticias';

const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const wordsToIgnore: string[] = [
  'a',
  'adelante',
  'ademas',
  'además',
  'agrego',
  'agregó',
  'ahi',
  'ahora',
  'ahí',
  'al',
  'algo',
  'algun',
  'alguna',
  'algunas',
  'alguno',
  'algunos',
  'algún',
  'alrededor',
  'ambos',
  'ampleamos',
  'ante',
  'anterior',
  'antes',
  'apenas',
  'aproximadamente',
  'aquel',
  'aquellas',
  'aquellos',
  'aqui',
  'aqui',
  'aquí',
  'arriba',
  'asi',
  'así',
  'atras',
  'atrás',
  'aun',
  'aunque',
  'ayer',
  'añadio',
  'añadió',
  'aún',
  'bajo',
  'bastante',
  'bien',
  'buen',
  'buena',
  'buenas',
  'bueno',
  'buenos',
  'cada',
  'casi',
  'cerca',
  'cierta',
  'ciertas',
  'cierto',
  'ciertos',
  'cinco',
  'como',
  'como',
  'con',
  'conocer',
  'conseguimos',
  'conseguir',
  'considera',
  'considero',
  'consideró',
  'consigo',
  'consigue',
  'consiguen',
  'consigues',
  'contra',
  'cosas',
  'creo',
  'cual',
  'cuales',
  'cualquier',
  'cualquiera',
  'cuando',
  'cuanta',
  'cuanto',
  'cuatro',
  'cuenta',
  'cuáles',
  'cuánta',
  'cuánto',
  'cómo',
  'da',
  'dado',
  'dan',
  'dar',
  'de',
  'debe',
  'deben',
  'debido',
  'decir',
  'dejo',
  'dejó',
  'del',
  'demas',
  'demás',
  'dentro',
  'desde',
  'despues',
  'después',
  'dice',
  'dicen',
  'dicho',
  'dieron',
  'diferente',
  'diferentes',
  'dio',
  'donde',
  'dos',
  'durante',
  'e',
  'ejemplo',
  'el',
  'ella',
  'ellas',
  'ello',
  'ellos',
  'embargo',
  'empleais',
  'emplean',
  'emplear',
  'empleas',
  'empleo',
  'en',
  'encima',
  'encuentra',
  'entonces',
  'entre',
  'era',
  'eramos',
  'eran',
  'eras',
  'eres',
  'es',
  'esa',
  'esas',
  'ese',
  'eso',
  'esos',
  'esta',
  'estaba',
  'estaban',
  'estado',
  'estais',
  'estamos',
  'estan',
  'estar',
  'estas',
  'este',
  'esto',
  'estos',
  'estoy',
  'está',
  'están',
  'ex',
  'existe',
  'existen',
  'explico',
  'explicó',
  'expreso',
  'expresó',
  'fin',
  'fue',
  'fuera',
  'fueron',
  'fui',
  'fuimos',
  'gran',
  'grandes',
  'ha',
  'haber',
  'habia',
  'habian',
  'habra',
  'habrá',
  'había',
  'habían',
  'hace',
  'haceis',
  'hacemos',
  'hacen',
  'hacer',
  'hacerlo',
  'haces',
  'hacia',
  'haciendo',
  'hago',
  'han',
  'hasta',
  'hay',
  'haya',
  'he',
  'hecho',
  'hemos',
  'hicieron',
  'hizo',
  'hoy',
  'hubo',
  'igual',
  'incluso',
  'intenta',
  'intentais',
  'intentamos',
  'intentan',
  'intentar',
  'intentas',
  'intento',
  'ir',
  'junto',
  'la',
  'lado',
  'largo',
  'las',
  'le',
  'les',
  'llego',
  'llegó',
  'lleva',
  'llevar',
  'lo',
  'los',
  'luego',
  'lugar',
  'manera',
  'mas',
  'mayor',
  'me',
  'mediante',
  'mejor',
  'menos',
  'mi',
  'mientras',
  'mio',
  'misma',
  'mismas',
  'mismo',
  'mismos',
  'modo',
  'momento',
  'mucha',
  'muchas',
  'mucho',
  'muchos',
  'muy',
  'más',
  'nada',
  'nadie',
  'ni',
  'ningun',
  'ninguna',
  'ningunas',
  'ninguno',
  'ningunos',
  'ningún',
  'nos',
  'nosotras',
  'nosotros',
  'nuestra',
  'nuestras',
  'nuestro',
  'nuestros',
  'nunca',
  'o',
  'ocho',
  'otra',
  'otras',
  'otro',
  'otros',
  'para',
  'parece',
  'parte',
  'partir',
  'pasada',
  'pasado',
  'pero',
  'pesar',
  'poca',
  'pocas',
  'poco',
  'pocos',
  'podeis',
  'podemos',
  'poder',
  'podra',
  'podran',
  'podria',
  'podriais',
  'podriamos',
  'podrian',
  'podrian',
  'podrias',
  'podrá',
  'podrán',
  'podría',
  'podríais',
  'podríamos',
  'podrían',
  'podrías',
  'podéis',
  'poner',
  'por',
  'por qué',
  'porque',
  'posible',
  'primer',
  'primera',
  'primeras',
  'primero',
  'primeros',
  'principalmente',
  'propia',
  'propias',
  'propio',
  'propios',
  'proxima',
  'proximas',
  'proximo',
  'proximos',
  'próxima',
  'próximas',
  'próximo',
  'próximos',
  'pudo',
  'pueda',
  'puede',
  'pueden',
  'puedo',
  'pues',
  'que',
  'quedó',
  'queremos',
  'quien',
  'quien',
  'quienes',
  'quiere',
  'quién',
  'qué',
  'realizado',
  'realizar',
  'realizó',
  'respecto',
  'sabe',
  'sabeis',
  'sabemos',
  'saben',
  'saber',
  'sabes',
  'se',
  'sea',
  'sean',
  'segun',
  'segunda',
  'segundo',
  'según',
  'seis',
  'ser',
  'será',
  'serán',
  'sería',
  'señaló',
  'sido',
  'siempre',
  'siendo',
  'siete',
  'sigue',
  'siguiente',
  'sin',
  'sino',
  'sobre',
  'sois',
  'sola',
  'solamente',
  'solas',
  'solo',
  'solos',
  'somos',
  'son',
  'soy',
  'su',
  'sus',
  'sólo',
  'tal',
  'tambien',
  'también',
  'tampoco',
  'tan',
  'tanto',
  'tendrá',
  'tendrán',
  'teneis',
  'tenemos',
  'tener',
  'tenga',
  'tengo',
  'tenido',
  'tenéis',
  'tenía',
  'tercera',
  'tiempo',
  'tiene',
  'tienen',
  'toda',
  'todas',
  'todavia',
  'todavía',
  'todo',
  'todos',
  'total',
  'trabaja',
  'trabajais',
  'trabajamos',
  'trabajan',
  'trabajar',
  'trabajas',
  'trabajo',
  'trabajáis',
  'tras',
  'trata',
  'través',
  'tres',
  'tuvo',
  'tuyo',
  'ultima',
  'ultimo',
  'un',
  'una',
  'unas',
  'uno',
  'unos',
  'usa',
  'usais',
  'usamos',
  'usan',
  'usar',
  'usas',
  'uso',
  'usted',
  'usáis',
  'va',
  'vais',
  'vamos',
  'van',
  'varias',
  'varios',
  'vaya',
  'veces',
  'ver',
  'verdad',
  'verdadera',
  'verdadero',
  'vez',
  'vosotras',
  'vosotros',
  'voy',
  'y',
  'ya',
  'yo',
  'él',
  'ésta',
  'éstas',
  'éste',
  'éstos',
  'última',
  'últimas',
  'último',
  'últimos',
];

export class SemaforoGeneral {
  enlaces_salientes = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 2,
    error_msg: '',
    label: 'Enlaces Salientes',
  };

  enlaces_internos = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 3,
    error_msg: '',
    label: 'Enlaces Internos',
  };

  image_presence = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 10,
    error_msg: '',
    label: 'Imágenes',
  };

  keyphrase_in_seo_title = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 14,
    error_msg: '',
    label: 'Keywords en el Título SEO',
  };

  densidad_keyphrase = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 14,
    error_msg: '',
    label: 'Densidad de las Keywords',
  };

  longitud_metadescription_subtitulo = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 10,
    error_msg: '',
    label: 'Longitud Subtitulo',
  };

  keyphrase_in_slug_seo_url = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 14,
    error_msg: '',
    label: 'Keywords en el SEO Url',
  };

  text_length = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 14,
    error_msg: '',
    label: 'Longitud total del Texto',
  };

  keyphrase_length = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 5,
    error_msg: '',
    label: 'Cantidad de Keywords',
  };

  width_titulo_seo = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 9,
    error_msg: '',
    label: 'Longitud Título',
  };

  keyphrase_in_introduction = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 5,
    error_msg: '',
    label: 'Keywords en la Introducción',
  };

  estadisticas = {
    porcentaje: 0,
    color: 'grey',
  };

  // Contador Parrafos y Array Parrafos
  contador_parrafos = 0;
  array_parrafos: NewsContent[] = [];

  // Vars Frase Clave
  wordsFraseClave = '';
  wordsFraseClaveArray: string[] = [];

  procesar(formEditNoticia: News) {
    this.procesarDatos(formEditNoticia);
    this.calcularPorcentaje();
  }

  private procesarDatos(formEditNoticia: News) {
    // Data to use
    this.getParrafosAndContParrafos(formEditNoticia);
    this.getFraseClave(formEditNoticia);

    // enlaces_salientes
    this.getEnlacesSalientes();

    // enlaces_internos
    this.getEnlacesInternos();

    // image_presence
    this.getImagePresence(formEditNoticia);

    // keyphrase_in_seo_title
    this.getKeyphraseInTituloSeo(formEditNoticia);

    // densidad_keyphrase
    this.getDensidadKeyphrase();

    // longitud_metadescription_subtitulo
    this.getLongitudMetadescripcion(formEditNoticia);

    // keyphrase_in_slug_seo_url
    this.getKeyphraseInSlugSeoUrl(formEditNoticia);

    // text_length
    this.getTextLength();

    // keyphrase_length
    this.getKeyphraseLength(formEditNoticia);

    // width_titulo_seo
    this.getWidthTituloSeo(formEditNoticia);

    // keyphrase_in_introduction
    this.getKeyphraseInIntroduction();
  }

  calcularPorcentaje() {
    let sum_porcentaje_final = 0;

    const arrayParametros = this.getResultadosComoArray();
    arrayParametros.forEach((parametro: any) => {
      sum_porcentaje_final += parametro.value * parametro.porcentaje;
    });

    // estadisticas
    this.estadisticas.color = 'red';
    if (sum_porcentaje_final > 33 && sum_porcentaje_final <= 66) {
      this.estadisticas.color = 'amber';
    }
    if (sum_porcentaje_final > 66 && sum_porcentaje_final <= 100) {
      this.estadisticas.color = 'green';
    }

    this.estadisticas.porcentaje = sum_porcentaje_final;
  }

  getResultadosComoObjeto(): object {
    return {
      enlaces_salientes: this.enlaces_salientes,
      enlaces_internos: this.enlaces_internos,
      image_presence: this.image_presence,
      keyphrase_in_seo_title: this.keyphrase_in_seo_title,
      densidad_keyphrase: this.densidad_keyphrase,
      longitud_metadescription_subtitulo: this.longitud_metadescription_subtitulo,
      keyphrase_in_slug_seo_url: this.keyphrase_in_slug_seo_url,
      text_length: this.text_length,
      keyphrase_length: this.keyphrase_length,
      width_titulo_seo: this.width_titulo_seo,
      keyphrase_in_introduction: this.keyphrase_in_introduction,
      estadisticas: this.estadisticas,
    };
  }

  getResultadosComoArray(): object[] {
    return [
      this.enlaces_salientes,
      this.enlaces_internos,
      this.image_presence,
      this.keyphrase_in_seo_title,
      this.densidad_keyphrase,
      this.longitud_metadescription_subtitulo,
      this.keyphrase_in_slug_seo_url,
      this.text_length,
      this.keyphrase_length,
      this.width_titulo_seo,
      this.keyphrase_in_introduction,
    ];
  }

  // Data to use
  getParrafosAndContParrafos(formEditNoticia: News) {
    this.contador_parrafos = 0;
    this.array_parrafos = [];
    formEditNoticia.news_content.forEach((news_content: NewsContent) => {
      if (news_content.tipo == 1) {
        this.contador_parrafos++;
        this.array_parrafos.push(news_content);
      }
    });
  }

  getFraseClave(formEditNoticia: News) {
    // frase_clave => keywords
    this.wordsFraseClave = '';
    this.wordsFraseClaveArray = [];

    if (
      formEditNoticia.keywords !== '' &&
      formEditNoticia.keywords !== null &&
      formEditNoticia.keywords !== undefined
    ) {
      const frase_clave_en_keywords: string = formEditNoticia.keywords;
      const frase_clave_en_keywords_array_string: string[] = frase_clave_en_keywords.split(',');
      frase_clave_en_keywords_array_string.forEach((keyword: string) => {
        if (!wordsToIgnore.includes(keyword.toLowerCase())) {
          this.wordsFraseClaveArray.push(keyword.toLowerCase());
          this.wordsFraseClave = this.wordsFraseClave + ' ' + keyword.toLowerCase();
        }
      });
    }
  }

  // enlaces_salientes
  getEnlacesSalientes() {
    // enlaces_salientes
    if (this.contador_parrafos < 1) {
      this.enlaces_salientes.value = 0;
      this.enlaces_salientes.error_msg =
        'No hay enlaces salientes en esta página, ¡asegúrate de añadir alguno!';
    } else if (this.contador_parrafos >= 1) {
      let contador_enlaces_salientes = 0;
      this.array_parrafos.forEach((parrafo: NewsContent) => {
        if (process.env.WEB_URL != undefined) {
          if (
            (parrafo.contenido.toLocaleLowerCase().indexOf('https://') > -1 ||
              parrafo.contenido.toLocaleLowerCase().indexOf('http://') > -1) &&
            !(
              parrafo.contenido
                .toLowerCase()
                .indexOf(process.env.WEB_URL.toLowerCase().replace('www.', '')) > -1 ||
              parrafo.contenido.toLowerCase().indexOf(process.env.WEB_URL.toLowerCase()) > -1
            )
          ) {
            contador_enlaces_salientes++;
          }
        }
      });

      // Proceso mensaje de error
      if (contador_enlaces_salientes == 0) {
        // Red
        this.enlaces_salientes.value = 0;
        this.enlaces_salientes.error_msg =
          'No hay enlaces salientes en esta página, ¡asegúrate de añadir alguno!';
      }
      if (contador_enlaces_salientes >= 1) {
        // Green
        this.enlaces_salientes.value = 1;
        this.enlaces_salientes.error_msg = '¡Buen trabajo!';
      }
    }
  }

  // enlaces_internos
  getEnlacesInternos() {
    // enlaces_internos
    if (this.contador_parrafos < 1) {
      this.enlaces_internos.value = 0;
      this.enlaces_internos.error_msg =
        'No hay enlaces internos en esta página, ¡asegúrate de añadir alguno!';
    } else if (this.contador_parrafos >= 1) {
      let cont_enlaces_internos = 0;
      this.array_parrafos.forEach((parrafo: NewsContent) => {
        if (process.env.WEB_URL != undefined) {
          if (
            parrafo.contenido
              .toLowerCase()
              .indexOf(process.env.WEB_URL.toLowerCase().replace('www.', '')) > -1 ||
            parrafo.contenido.toLowerCase().indexOf(process.env.WEB_URL.toLowerCase()) > -1
          ) {
            cont_enlaces_internos++;
          }
        }
      });

      // Proceso mensaje de error
      if (cont_enlaces_internos < 1) {
        // Red
        this.enlaces_internos.value = 0;
        this.enlaces_internos.error_msg =
          'No hay enlaces internos en esta página, ¡asegúrate de añadir alguno!';
      }
      if (cont_enlaces_internos >= 1) {
        // Green
        this.enlaces_internos.value = 1;
        this.enlaces_internos.error_msg = '¡Buen trabajo!';
      }
    }
  }

  // image_presence
  getImagePresence(formEditNoticia: News) {
    // image_presence
    let cont_img = 0;
    formEditNoticia.news_content.forEach((news_content: NewsContent) => {
      if (news_content.tipo == 2) {
        cont_img++;
      }
    });
    if (cont_img == 0) {
      // Red
      this.image_presence.value = 0;
      this.image_presence.error_msg =
        'No aparece ninguna imagen además de la Portada en esta Noticia. ¡Añade alguna!';
    }
    if (cont_img >= 1) {
      // Green
      this.image_presence.value = 1;
      this.image_presence.error_msg = '¡Buen trabajo!';
    }
  }

  // keyphrase_in_seo_title
  getKeyphraseInTituloSeo(formEditNoticia: News) {
    // keyphrase_in_seo_title
    if (
      formEditNoticia.titulo === '' ||
      formEditNoticia.titulo === null ||
      formEditNoticia.titulo === undefined
    ) {
      this.keyphrase_in_seo_title.value = 0;
      this.keyphrase_in_seo_title.error_msg = 'No se ha ingresado aún el Título de la Noticia!';
    } else if (
      formEditNoticia.titulo !== '' &&
      formEditNoticia.titulo !== null &&
      formEditNoticia.titulo !== undefined
    ) {
      let cont_coincidencias_keyphrase = 0;
      this.wordsFraseClaveArray.forEach((palabra: string) => {
        if (formEditNoticia.titulo.toLowerCase().indexOf(palabra.toLowerCase()) > -1) {
          cont_coincidencias_keyphrase++;
        }
      });

      // Proceso mensaje de error
      const porcentaje_coincidencias_keyphrase_en_seo_title: number = parseFloat(
        ((cont_coincidencias_keyphrase * 100) / this.wordsFraseClaveArray.length).toFixed(2),
      );
      if (cont_coincidencias_keyphrase === 0) {
        // Red
        this.keyphrase_in_seo_title.value = 0;
        this.keyphrase_in_seo_title.error_msg =
          'Ningun de las Keywords se ha encontrado en el Título.';
      }
      if (
        porcentaje_coincidencias_keyphrase_en_seo_title >= 10 &&
        porcentaje_coincidencias_keyphrase_en_seo_title <= 45
      ) {
        // Yellow
        this.keyphrase_in_seo_title.value = 0.5;
        this.keyphrase_in_seo_title.error_msg = 'Parte de las Keywords no aparecen en el Título.';
      }
      if (
        porcentaje_coincidencias_keyphrase_en_seo_title > 45 &&
        porcentaje_coincidencias_keyphrase_en_seo_title <= 66
      ) {
        // Green
        this.keyphrase_in_seo_title.value = 1;
        this.keyphrase_in_seo_title.error_msg =
          'Hay una buena presencia de las Keywords en el Título. ¡Buen trabajo!';
      }
      if (porcentaje_coincidencias_keyphrase_en_seo_title > 66) {
        // Green
        this.keyphrase_in_seo_title.value = 1;
        this.keyphrase_in_seo_title.error_msg =
          'La mayoría de las Keywords aparecen en el Título. ¡Buen trabajo!';
      }
    }
  }

  // densidad_keyphrase
  /* getDensidadKeyphrase(){
    // densidad_keyphrase
    if(this.contador_parrafos < 1) {
      this.densidad_keyphrase.value = 0
      this.densidad_keyphrase.error_msg = "No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis."
      return
    }

    let cont_coincidencias_keyphrase = 0;
    let cont_coincidencias_keyphrase_en_parrafo = 0;
    this.array_parrafos.forEach((parrafo: NewsContent) => {
      const parrafoLimpio = stripHtml(parrafo.contenido);
      const parrafo_en_palabras: string[] = parrafoLimpio.split(".")
      // Reinicio contador de coincidencias
      cont_coincidencias_keyphrase_en_parrafo = 0

      parrafo_en_palabras.forEach((palabra: string) => {
        if(this.wordsFraseClave.toLowerCase().indexOf(palabra.toLowerCase()) > -1) {
          cont_coincidencias_keyphrase_en_parrafo++;
        }
      })
      // Si encontré al menos la mitad de palabras de la keyphrase en un parrafo puedo considerar que se lo usa correctamente en él
      //if(cont_coincidencias_keyphrase_en_parrafo > (this.wordsFraseClaveArray.length/2)){
        cont_coincidencias_keyphrase++;
      //}
    })

    // Proceso mensaje de error
    if(cont_coincidencias_keyphrase === 0){ // Red
      this.densidad_keyphrase.value = 0
      this.densidad_keyphrase.error_msg = "Las Keywords se han encontrado 0 veces. Eso es menos que el mínimo recomendado de 2 veces para un texto con esta longitud. ¡Céntrate en tu palabras clave!";
    }
    // Yellow
    if(cont_coincidencias_keyphrase == 1){ // Yellow
      this.densidad_keyphrase.value = 0.5
      this.densidad_keyphrase.error_msg = "Las Keywords se han encontrado 1 veces. Eso es menos que el mínimo recomendado de 2 veces para un texto con esta longitud. ¡Céntrate en tu palabras clave!";
    }
    if(cont_coincidencias_keyphrase > 1){ // Green
      this.densidad_keyphrase.value = 1
      this.densidad_keyphrase.error_msg =  "Las Keywords se han encontrado " + cont_coincidencias_keyphrase + " veces. ¡Buen trabajo!";
    }

  } */

  getDensidadKeyphrase() {
    // densidad_keyphrase
    if (this.contador_parrafos < 1) {
      this.densidad_keyphrase.value = 0;
      this.densidad_keyphrase.error_msg =
        'No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis.';
      return;
    }

    interface KeyWordCountI {
      keyword: string;
      count: number;
    }
    const keyWordsCount: KeyWordCountI[] = this.wordsFraseClaveArray.map((keyWord: string) => ({
      keyword: keyWord.trim(),
      count: 0,
    }));

    this.array_parrafos.forEach((parrafo: NewsContent) => {
      const parrafoLimpio = stripHtml(parrafo.contenido);

      keyWordsCount.forEach((keyWord: KeyWordCountI) => {
        const searchRegex = new RegExp(`${keyWord.keyword}`, 'g');
        const conteo = (parrafoLimpio.toLowerCase().match(searchRegex) || []).length;
        keyWord.count += conteo;
      });
    });

    let keyWordsMinimo1 = 0;
    keyWordsCount.forEach((keyWord: KeyWordCountI) => {
      if (keyWord.count >= 1) {
        keyWordsMinimo1++;
      }
    });

    if (keyWordsMinimo1 == 0) {
      // RED
      this.densidad_keyphrase.value = 0;
      this.densidad_keyphrase.error_msg =
        'Las Keywords se han encontrado 0 veces en el texto. ¡Céntrate en tu palabras clave!';
    }

    if (keyWordsCount.length - keyWordsMinimo1 > keyWordsCount.length / 2) {
      // YELLOW
      this.densidad_keyphrase.value = 0.5;
      this.densidad_keyphrase.error_msg =
        'La mayoría de Keywords no se han utilizado mínimo 1 vez. Trata de integrar tus palabras clave en el texto';
    }

    if (keyWordsCount.length - keyWordsMinimo1 <= keyWordsCount.length / 2) {
      // Green
      this.densidad_keyphrase.value = 1;
      this.densidad_keyphrase.error_msg =
        'La mayoría de Keywords se han utilizado mínimo 1 vez. ¡Buen trabajo!, puedes mejorarlo';
    }

    if (keyWordsCount.length == keyWordsMinimo1) {
      // Green
      this.densidad_keyphrase.value = 1;
      this.densidad_keyphrase.error_msg =
        'Todas las Keywords se han utilizado mínimo 1 vez. ¡Excelente trabajo!';
    }
  }

  // longitud_metadescription_subtitulo
  getLongitudMetadescripcion(formEditNoticia: News) {
    // longitud_metadescription_subtitulo
    if (formEditNoticia.subtitulo.length < 25) {
      // Yellow
      this.longitud_metadescription_subtitulo.value = 0.5;
      this.longitud_metadescription_subtitulo.error_msg =
        'La meta description tiene menos de 25 caracteres, es aceptable pero se puede mejorar.';
    }
    if (formEditNoticia.subtitulo.length == 0) {
      // Red
      this.longitud_metadescription_subtitulo.value = 0;
      this.longitud_metadescription_subtitulo.error_msg =
        'No se ha especificado ningún subtitulo. Los motores de búsqueda mostrarán en su lugar texto de la página.';
    }
    if (formEditNoticia.subtitulo.length >= 25 && formEditNoticia.subtitulo.length <= 155) {
      // Green
      this.longitud_metadescription_subtitulo.value = 1;
      this.longitud_metadescription_subtitulo.error_msg = '¡Bien hecho!';
    }
    if (formEditNoticia.subtitulo.length > 155) {
      // Red
      this.longitud_metadescription_subtitulo.value = 0;
      this.longitud_metadescription_subtitulo.error_msg =
        'La meta description tiene más de 155 caracteres. Asegúrate de que sea visible toda la description en la previsualización de Google.';
    }
  }

  // keyphrase_in_slug_seo_url
  getKeyphraseInSlugSeoUrl(formEditNoticia: News) {
    // keyphrase_in_slug_seo_url
    if (
      formEditNoticia.seo_url === '' ||
      formEditNoticia.seo_url === null ||
      formEditNoticia.seo_url === undefined
    ) {
      this.keyphrase_in_slug_seo_url.value = 0;
      this.keyphrase_in_slug_seo_url.error_msg = 'No ha ingresado aún el Seo Url!';
    } else if (
      formEditNoticia.seo_url !== '' &&
      formEditNoticia.seo_url !== null &&
      formEditNoticia.seo_url !== undefined
    ) {
      let cont_coincidencias_keyphrase = 0;
      this.wordsFraseClaveArray.forEach((palabra: string) => {
        if (formEditNoticia.seo_url.toLowerCase().indexOf(palabra.toLowerCase()) > -1) {
          cont_coincidencias_keyphrase++;
        }
      });

      // Proceso mensaje de error
      const porcentaje_coincidencias_keyphrase_en_seo_url: number = parseFloat(
        ((cont_coincidencias_keyphrase * 100) / this.wordsFraseClaveArray.length).toFixed(2),
      );
      if (cont_coincidencias_keyphrase === 0) {
        // Red
        this.keyphrase_in_slug_seo_url.value = 0;
        this.keyphrase_in_slug_seo_url.error_msg =
          'Ningunas de las Keywords se ha encontrado en el SEO Url.';
      }
      if (
        porcentaje_coincidencias_keyphrase_en_seo_url >= 10 &&
        porcentaje_coincidencias_keyphrase_en_seo_url <= 45
      ) {
        // Yellow
        this.keyphrase_in_slug_seo_url.value = 0.5;
        this.keyphrase_in_slug_seo_url.error_msg =
          'Parte de las Keywords no aparecen en el SEO Url.';
      }
      if (
        porcentaje_coincidencias_keyphrase_en_seo_url > 45 &&
        porcentaje_coincidencias_keyphrase_en_seo_url <= 66
      ) {
        // Green
        this.keyphrase_in_slug_seo_url.value = 1;
        this.keyphrase_in_slug_seo_url.error_msg =
          'Hay una buena presencia de las Keywords en el SEO Url. ¡Buen trabajo!';
      }
      if (porcentaje_coincidencias_keyphrase_en_seo_url > 66) {
        // Green
        this.keyphrase_in_slug_seo_url.value = 1;
        this.keyphrase_in_slug_seo_url.error_msg =
          'La mayoría de las Keywords aparecen en el SEO Url. ¡Buen trabajo!';
      }
    }
  }

  // text_length
  getTextLength() {
    // text_length
    if (this.contador_parrafos < 1) {
      this.text_length.value = 0;
      this.text_length.error_msg =
        'No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis.';
    } else if (this.contador_parrafos >= 1) {
      let cont_palabras_parrafos = 0;
      this.array_parrafos.forEach((parrafo: NewsContent) => {
        const parrafoLimpio = stripHtml(parrafo.contenido);
        cont_palabras_parrafos += parrafoLimpio.split(' ').length;
      });

      // Proceso mensaje de error
      if (cont_palabras_parrafos < 300) {
        // Red
        this.text_length.value = 0;
        this.text_length.error_msg =
          'El texto contiene ' +
          cont_palabras_parrafos +
          ' palabras. Está por debajo del mínimo recomendado de 300 palabras.';
      }
      // Green o Red, limite 300 palabras
      if (cont_palabras_parrafos >= 300) {
        // Green
        this.text_length.value = 1;
        this.text_length.error_msg =
          'El texto contiene ' + cont_palabras_parrafos + ' palabras. ¡Buen trabajo!';
      }
    }
  }

  // keyphrase_length
  getKeyphraseLength(formEditNoticia: News) {
    // keyphrase_length
    if (
      formEditNoticia.keywords === '' ||
      formEditNoticia.keywords === null ||
      formEditNoticia.keywords === undefined
    ) {
      this.keyphrase_length.value = 0;
      this.keyphrase_length.error_msg = 'No ha ingresado aún el Seo Url!';
    } else if (
      formEditNoticia.keywords !== '' &&
      formEditNoticia.keywords !== null &&
      formEditNoticia.keywords !== undefined
    ) {
      // Proceso mensaje de error
      if (this.wordsFraseClaveArray.length === 0) {
        // Red
        this.keyphrase_length.value = 0;
        this.keyphrase_length.error_msg = 'No ha ingresado aún las Keywords';
      }
      if (this.wordsFraseClaveArray.length > 10) {
        // Yellow
        this.keyphrase_length.value = 0.5;
        this.keyphrase_length.error_msg =
          'El campo Keywords contiene ' +
          this.wordsFraseClaveArray.length +
          ' palabras de contenido. Eso es más que el máximo recomendado de 10 palabras.';
      }
      if (this.wordsFraseClaveArray.length >= 4 && this.wordsFraseClaveArray.length <= 10) {
        // Green
        this.keyphrase_length.value = 1;
        this.keyphrase_length.error_msg = '¡Buen trabajo!';
      }
    }
  }

  // width_titulo_seo
  getWidthTituloSeo(formEditNoticia: News) {
    // width_titulo_seo
    if (
      formEditNoticia.titulo === '' ||
      formEditNoticia.titulo === null ||
      formEditNoticia.titulo === undefined
    ) {
      this.width_titulo_seo.value = 0;
      this.width_titulo_seo.error_msg = 'No ha ingresado aún el Título!';
    } else if (
      formEditNoticia.titulo !== '' &&
      formEditNoticia.titulo !== null &&
      formEditNoticia.titulo !== undefined
    ) {
      // Proceso mensaje de error
      if (formEditNoticia.titulo.length > 60) {
        // Red
        this.width_titulo_seo.value = 0;
        this.width_titulo_seo.error_msg =
          'El campo Título contiene ' +
          formEditNoticia.titulo.length +
          ' caracteres de contenido. Eso es más que el máximo recomendado de 60 caracteres.';
      }
      if (formEditNoticia.titulo.length < 10) {
        // Yellow
        this.width_titulo_seo.value = 0.5;
        this.width_titulo_seo.error_msg = 'El Título es demasiado corto.';
      }
      if (formEditNoticia.titulo.length >= 10 && formEditNoticia.titulo.length <= 60) {
        // Green
        this.width_titulo_seo.value = 1;
        this.width_titulo_seo.error_msg =
          '¡Buen trabajo, el título se leerá de forma correcta en la previsualización de Google!';
      }
    }
  }

  // keyphrase_in_introduction
  getKeyphraseInIntroduction() {
    // keyphrase_in_introduction
    if (this.contador_parrafos < 1) {
      this.keyphrase_in_introduction.value = 0;
      this.keyphrase_in_introduction.error_msg =
        'No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis.';
    } else if (this.contador_parrafos >= 1) {
      // Tomo el parrafo con la position menor de todos los parrafos, esta sería la introducción
      const parrafo_introduccion = this.array_parrafos.reduce((acc, loc) =>
        acc.position < loc.position ? acc : loc,
      );
      const parrafoIntroduccionLimpio: string = stripHtml(parrafo_introduccion.contenido);

      let cont_keywords_en_introduccion = 0;
      this.wordsFraseClaveArray.forEach((palabra: string) => {
        if (parrafoIntroduccionLimpio.toLowerCase().indexOf(palabra.toLowerCase()) > -1) {
          cont_keywords_en_introduccion++;
        }
      });

      // Proceso mensaje de error
      const porcentaje_coincidencias_keyphrase_en_introduccion: number = parseFloat(
        ((cont_keywords_en_introduccion * 100) / this.wordsFraseClaveArray.length).toFixed(2),
      );
      if (cont_keywords_en_introduccion === 0) {
        // Red
        this.keyphrase_in_introduction.value = 0;
        this.keyphrase_in_introduction.error_msg =
          'Las Keywords no se han encontrado en la Introducción.';
      }
      if (
        porcentaje_coincidencias_keyphrase_en_introduccion >= 10 &&
        porcentaje_coincidencias_keyphrase_en_introduccion <= 45
      ) {
        // Yellow
        this.keyphrase_in_introduction.value = 0.5;
        this.keyphrase_in_introduction.error_msg =
          'Parte de las Keywords no aparecen en la Introducción.';
      }
      if (
        porcentaje_coincidencias_keyphrase_en_introduccion > 45 &&
        porcentaje_coincidencias_keyphrase_en_introduccion <= 66
      ) {
        // Green
        this.keyphrase_in_introduction.value = 1;
        this.keyphrase_in_introduction.error_msg =
          'Hay una buena presencia de las Keywords en la Introducción. ¡Buen trabajo!';
      }
      if (porcentaje_coincidencias_keyphrase_en_introduccion > 66) {
        // Green
        this.keyphrase_in_introduction.value = 1;
        this.keyphrase_in_introduction.error_msg =
          'La mayoría de las Keywords aparecen en la Introducción. ¡Buen trabajo!';
      }
    }
  }
}
