import type { News, NewsContent } from 'src/interfaces/noticias';
import axios from 'axios';

import { userLoginHandler } from 'src/stores/UserLoginHandler';

import { useQuasar } from 'quasar';
const $q = useQuasar();

const userLoginStore = userLoginHandler();

const stripHtml = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
const transitionWords: string[] = [
  'Ya',
  'Todavía',
  'Todavía no',
  'Primero',
  'En primer lugar',
  'Segundo',
  'Luego',
  'Después',
  'Más tarde',
  'Entonces',
  'Pronto',
  'Al final',
  'Finalmente',
  'Para continuar',
  'Para terminar',
  'Por último',
  'Cuando',
  'En cuanto',
  'Tan pronto',
  'Mientras',
  'Mientras tanto',
  'Al mismo tiempo',
  'Aquí',
  'acá',
  'Ahí',
  'Allí',
  'allá',
  'Por ejemplo',
  'Es decir',
  'Como',
  'Entre ellos',
  'Entre ellas',
  'Ya que',
  'Entre otros',
  'Entre otras',
  'Y',
  'Además',
  'Además de',
  'También',
  'Asimismo',
  'Igualmente',
  'Del mismo modo',
  'Por otro lado',
  'Por otra parte',
  'Aparte',
  'Como resultado',
  'En consecuencia',
  'Como consecuencia de',
  'Por eso',
  'Por esto',
  'Por ello',
  'Por lo tanto',
  'Por consiguiente',
  'Por esta razón',
  'Así que',
  'Así',
  'Sobre todo',
  'Especialmente',
  'Efectivamente',
  'Realmente',
  'De hecho',
  'Principalmente',
  'En efecto',
  'Como',
  'Viceversa',
  'Pero',
  'Sino',
  'Aunque',
  'No obstante',
  'Aun así',
  'Sin embargo',
  'A pesar de',
  'Al contrario',
  'Contrario a',
  'Por el contrario',
  'En síntesis',
  'En resumen',
  'Para resumir',
  'En general',
  'Después de todo',
  'En conclusión',
];

export class SemaforoLegibilidad {
  sentence_length = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 15,
    error_msg: '',
    label: 'Longitud de las frases',
  };

  frases_consecutivas = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 25,
    error_msg: '',
    label: 'Frases consecutivas',
  };

  check_use_transition_words = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 25,
    error_msg: '',
    label: 'Uso de Palabras de Transición',
  };

  paragraph_length = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 15,
    error_msg: '',
    label: 'Longitud de los parrafos',
  };

  voz_pasiva = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 20,
    error_msg: '',
    label: 'Voz Pasiva',
  };

  /* subheading_distribution = {
    value: 0, // default value 0 => red, 0.5 => yellow, 1 => green
    porcentaje: 20,
    error_msg: "",
    label: "Distribución de los Encabezados"
  }; */

  estadisticas = {
    porcentaje: 0,
    color: 'grey',
  };

  // Contador Parrafos y Array Parrafos
  contador_parrafos = 0;
  array_parrafos: NewsContent[] = [];

  async procesar(formEditNoticia: News) {
    await this.procesarDatos(formEditNoticia);
    this.calcularPorcentaje();
  }

  private async procesarDatos(formEditNoticia: News) {
    // Data to use
    this.getParrafosAndContParrafos(formEditNoticia);

    // sentence_length
    this.getSentenceLength();

    // frases_consecutivas
    this.getCalculoFrasesConsecutivas();

    // check_use_transition_words
    this.getCheckUseTransitionWords();

    // paragraph_length
    this.getParagraphLength();

    // voz_pasiva
    await this.getCalculoVozPasiva();

    // subheading_distribution
  }

  calcularPorcentaje() {
    let sum_porcentaje_final = 0;
    /* // sentence_length
    if(this.sentence_length.value > 0){
      if(this.sentence_length.value === 1){
        sum_porcentaje_final += ( this.sentence_length.porcentaje / 2 )
      }
      if(this.sentence_length.value === 2){
        sum_porcentaje_final += this.sentence_length.porcentaje
      }
    }

    // frases_consecutivas
    if(this.frases_consecutivas.value > 0){
      if(this.frases_consecutivas.value === 1){
        sum_porcentaje_final += ( this.frases_consecutivas.porcentaje / 2 )
      }
      if(this.frases_consecutivas.value === 2){
        sum_porcentaje_final += this.frases_consecutivas.porcentaje
      }
    }

    // check_use_transition_words
    if(this.check_use_transition_words.value > 0){
      if(this.check_use_transition_words.value === 1){
        sum_porcentaje_final += ( this.check_use_transition_words.porcentaje / 2 )
      }
      if(this.check_use_transition_words.value === 2){
        sum_porcentaje_final += this.check_use_transition_words.porcentaje
      }
    }

    // paragraph_length
    if(this.paragraph_length.value > 0){
      if(this.paragraph_length.value === 1){
        sum_porcentaje_final += ( this.paragraph_length.porcentaje / 2 )
      }
      if(this.paragraph_length.value === 2){
        sum_porcentaje_final += this.paragraph_length.porcentaje
      }
    }

    // voz_pasiva
    if(this.voz_pasiva.value > 0){
      if(this.voz_pasiva.value === 1){
        sum_porcentaje_final += ( this.voz_pasiva.porcentaje / 2 )
      }
      if(this.voz_pasiva.value === 2){
        sum_porcentaje_final += this.voz_pasiva.porcentaje
      }
    }

    // subheading_distribution */

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
      sentence_length: this.sentence_length,
      frases_consecutivas: this.frases_consecutivas,
      check_use_transition_words: this.check_use_transition_words,
      paragraph_length: this.paragraph_length,
      voz_pasiva: this.voz_pasiva,
      //subheading_distribution: this.subheading_distribution,
      estadisticas: this.estadisticas,
    };
  }

  getResultadosComoArray(): object[] {
    return [
      this.sentence_length,
      this.frases_consecutivas,
      this.check_use_transition_words,
      this.paragraph_length,
      this.voz_pasiva,
      //this.subheading_distribution
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

  // sentence_length
  getSentenceLength() {
    // sentence_length : 54.5% of the sentences contain more than 25 words, which is more than the recommended maximum of 25%.
    if (this.contador_parrafos < 1) {
      this.sentence_length.value = 0;
      this.sentence_length.error_msg =
        'No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis.';
    } else if (this.contador_parrafos >= 1) {
      const parrafos_estadisticas: { cant_frases: number; cont_exceso_palabras: number }[] = [];
      this.array_parrafos.forEach((parrafo: NewsContent) => {
        const parrafos_estadisticas_aux: { cant_frases: number; cont_exceso_palabras: number } = {
          cant_frases: 0,
          cont_exceso_palabras: 0,
        };
        const parrafoLimpio = stripHtml(parrafo.contenido);
        const parrafo_en_frases: string[] = parrafoLimpio.split('.');
        parrafo_en_frases.forEach((frase: string) => {
          if (frase != '' && frase != ' ' && frase != ' .' && frase != '. ') {
            parrafos_estadisticas_aux.cant_frases++;
            if (frase.split(' ').length > 25) {
              parrafos_estadisticas_aux.cont_exceso_palabras++;
            }
          }
        });
        parrafos_estadisticas.push(parrafos_estadisticas_aux);
      });

      const cant_frases = parrafos_estadisticas
        .map((parrafo) => parrafo.cant_frases)
        .reduce((accumulator, current) => accumulator + current, 0);
      const cont_exceso_palabras = parrafos_estadisticas
        .map((parrafo) => parrafo.cont_exceso_palabras)
        .reduce((accumulator, current) => accumulator + current, 0);

      // Proceso mensaje de error
      const porcentaje_frases_con_exceso_palabras: number = parseFloat(
        ((cont_exceso_palabras * 100) / cant_frases).toFixed(2),
      );
      if (cont_exceso_palabras == 0) {
        // Green
        this.sentence_length.value = 1;
        this.sentence_length.error_msg =
          'Ninguna de las frases tiene más de 25 palabras, el texto tiene buena legibilidad';
      }
      if (porcentaje_frases_con_exceso_palabras > 0 && porcentaje_frases_con_exceso_palabras < 25) {
        // Green
        this.sentence_length.value = 1;
        this.sentence_length.error_msg =
          'Menos del 25% de las frases supera el limite de más de 25 palabras, el texto tiene buena legibilidad. ¡Buen trabajo!';
      }
      if (porcentaje_frases_con_exceso_palabras >= 25) {
        // Red
        this.sentence_length.value = 0;
        this.sentence_length.error_msg =
          'El ' +
          porcentaje_frases_con_exceso_palabras +
          '% de las frases contienen más de 25 palabras, lo que supera el máximo recomendado del 25%.';
      }
    }
  }

  // frases_consecutivas
  getCalculoFrasesConsecutivas() {
    // frases_consecutivas
    if (this.contador_parrafos < 1) {
      this.frases_consecutivas.value = 0;
      this.frases_consecutivas.error_msg =
        'No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis.';
    } else if (this.contador_parrafos >= 1) {
      const array_frases_limpias_recortadas_to_process: string[] = [];
      // Creo array de frases de los parrafos
      this.array_parrafos.forEach((parrafo: NewsContent) => {
        const parrafoLimpio = stripHtml(parrafo.contenido);
        const parrafo_en_frases: string[] = parrafoLimpio.split('.');
        parrafo_en_frases.forEach((frase: string) => {
          if (frase != '' && frase != ' ' && frase != ' .' && frase != '. ') {
            // Creo la frase auxiliar con las primeras 3 palabras de la frase original, cuando verifico que la frase que se esta iterando en efecto
            // tiene minimo 3 palabras la junto en un solo string llamado frase_aux_to_push y lo pusheo en array_frases_limpias_recortadas_to_process para compararlas luego
            const frase_aux: string[] = frase.trim().split(' ', 3);
            if (frase_aux.length === 3) {
              const frase_aux_to_push = frase_aux[0] + ' ' + frase_aux[1] + ' ' + frase_aux[2];
              array_frases_limpias_recortadas_to_process.push(frase_aux_to_push);
            }
          }
        });
      });

      // Recorro las frases de array_frases_limpias_recortadas_to_process para ver si se repiten
      let contador_repeticion_frase_externa = 0;
      if (array_frases_limpias_recortadas_to_process.length > 0) {
        array_frases_limpias_recortadas_to_process.forEach((frase_parent_foreach: string) => {
          let contador_repeticion_frase_interna = 0;
          array_frases_limpias_recortadas_to_process.forEach((frase_child_foreach: string) => {
            if (frase_parent_foreach === frase_child_foreach) {
              contador_repeticion_frase_interna++;
            }
          });
          // Reviso si es mayor de 1 para descartar a la misma frase
          if (contador_repeticion_frase_interna > 1) {
            contador_repeticion_frase_externa++;
          }
        });
      }
      // Debido a los 2 forEach los resultados de contador_repeticion_frase_externa son siempre el doble así que se lo divide a mitad.
      contador_repeticion_frase_externa = contador_repeticion_frase_externa / 2;

      // Proceso mensaje de error
      if (contador_repeticion_frase_externa == 0) {
        // Green
        this.frases_consecutivas.value = 1;
        this.frases_consecutivas.error_msg =
          'Ninguna de las frases o parrafos contiene frases consecutivas, el texto tiene buena legibilidad';
      }
      if (contador_repeticion_frase_externa < 2) {
        // Green
        this.frases_consecutivas.value = 1;
        this.frases_consecutivas.error_msg =
          'Hay muy pocas frases consecutivas, el texto tiene buena legibilidad. ¡Buen trabajo!';
      }
      if (contador_repeticion_frase_externa >= 2 && contador_repeticion_frase_externa <= 3) {
        // Yellow
        this.frases_consecutivas.value = 0.5;
        this.frases_consecutivas.error_msg =
          'El texto posee ' +
          contador_repeticion_frase_externa +
          ' frases o parrafos que contienen frases consecutivas, revise de nuevo el texto.';
      }
      if (contador_repeticion_frase_externa > 3) {
        // Red
        this.frases_consecutivas.value = 0;
        this.frases_consecutivas.error_msg =
          'El texto posee demasiadas frases consecutivas. Revisalo.';
      }
    }
  }

  // check_use_transition_words
  getCheckUseTransitionWords() {
    // check_use_transition_words
    if (this.contador_parrafos < 1) {
      this.check_use_transition_words.value = 0;
      this.check_use_transition_words.error_msg =
        'No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis.';
    } else if (this.contador_parrafos >= 1) {
      const parrafos_estadisticas: { cant_frases: number; cont_coincidencia_en_frase: number }[] =
        [];
      this.array_parrafos.forEach((parrafo: NewsContent) => {
        const parrafos_estadisticas_aux: {
          cant_frases: number;
          cont_coincidencia_en_frase: number;
        } = { cant_frases: 0, cont_coincidencia_en_frase: 0 };

        const parrafoLimpio = stripHtml(parrafo.contenido);
        const parrafo_en_frases: string[] = parrafoLimpio.split('.');

        parrafo_en_frases.forEach((frase: string) => {
          if (frase != '' && frase != ' ' && frase != ' .' && frase != '. ') {
            parrafos_estadisticas_aux.cant_frases++;
            transitionWords.forEach((transition_word: string) => {
              if (frase.toLowerCase().indexOf(transition_word.toLowerCase()) > -1) {
                parrafos_estadisticas_aux.cont_coincidencia_en_frase++;
              }
            });
          }
        });
        parrafos_estadisticas.push(parrafos_estadisticas_aux);
      });

      const cant_frases = parrafos_estadisticas
        .map((parrafo) => parrafo.cant_frases)
        .reduce((accumulator, current) => accumulator + current, 0);
      const cont_coincidencia_en_frase_transition_words = parrafos_estadisticas
        .map((parrafo) => parrafo.cont_coincidencia_en_frase)
        .reduce((accumulator, current) => accumulator + current, 0);

      // Proceso mensaje de error
      const porcentaje_frases_con_coincidencia_en_frase_transition_words: number = parseFloat(
        ((cont_coincidencia_en_frase_transition_words * 100) / cant_frases).toFixed(2),
      );
      if (cont_coincidencia_en_frase_transition_words == 0) {
        // Red
        this.check_use_transition_words.value = 0;
        this.check_use_transition_words.error_msg =
          'No se encontró ninguna frase que haga uso de palabras de transición, esto vuelve el texto menos legible.';
      }
      if (porcentaje_frases_con_coincidencia_en_frase_transition_words < 20) {
        // Red
        this.check_use_transition_words.value = 0;
        this.check_use_transition_words.error_msg =
          'El ' +
          porcentaje_frases_con_coincidencia_en_frase_transition_words +
          '% de las frases hace uso de palabras de transición, el porcentaje es demasiado bajo, esto vuelve el texto menos legible.';
      }
      if (porcentaje_frases_con_coincidencia_en_frase_transition_words >= 30) {
        // Green
        this.check_use_transition_words.value = 1;
        this.check_use_transition_words.error_msg =
          'Más del 30% de las frases hace uso de palabras de transición, el texto tiene buena legibilidad. ¡Buen trabajo!';
      }
      if (
        porcentaje_frases_con_coincidencia_en_frase_transition_words >= 20 &&
        porcentaje_frases_con_coincidencia_en_frase_transition_words < 30
      ) {
        // Yellow
        this.check_use_transition_words.value = 0.5;
        this.check_use_transition_words.error_msg =
          'El ' +
          porcentaje_frases_con_coincidencia_en_frase_transition_words +
          '% de las frases hace uso de palabras de transición, el porcentaje es aceptable y el texto tiene buena legibilidad.';
      }
    }
  }

  // paragraph_length
  getParagraphLength() {
    // paragraph_length
    const parrafos_length_estadisticas: { cont_exceso_palabras: number } = {
      cont_exceso_palabras: 0,
    };
    if (this.contador_parrafos < 1) {
      this.paragraph_length.value = 0;
      this.paragraph_length.error_msg =
        'No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis.';
    } else if (this.contador_parrafos >= 1) {
      this.array_parrafos.forEach((parrafo: NewsContent) => {
        const parrafoLimpio = stripHtml(parrafo.contenido);
        // Check cantidad de palabras
        if (parrafoLimpio.split(' ').length > 150) {
          parrafos_length_estadisticas.cont_exceso_palabras++;
        }
      });

      // Proceso mensaje de error
      const porcentaje_parrafos_con_exceso_palabras: number = parseFloat(
        (
          (parrafos_length_estadisticas.cont_exceso_palabras * 100) /
          this.contador_parrafos
        ).toFixed(2),
      );

      if (parrafos_length_estadisticas.cont_exceso_palabras == 0) {
        // Green
        this.paragraph_length.value = 1;
        this.paragraph_length.error_msg =
          'Ninguno de los parrafos contiene más de 150 palabras, el texto tiene buena legibilidad.';
      }
      // Si la cantidad de parrafos con exceso de palabras esta entre 35% y 60% entonces error amarillo
      if (parrafos_length_estadisticas.cont_exceso_palabras > 0) {
        if (porcentaje_parrafos_con_exceso_palabras < 35) {
          // Green
          this.paragraph_length.value = 1;
        } else if (
          porcentaje_parrafos_con_exceso_palabras >= 35 &&
          porcentaje_parrafos_con_exceso_palabras <= 60
        ) {
          // Yellow
          this.paragraph_length.value = 0.5;
        } else if (porcentaje_parrafos_con_exceso_palabras > 60) {
          // Red
          this.paragraph_length.value = 0;
        }
        this.paragraph_length.error_msg =
          parrafos_length_estadisticas.cont_exceso_palabras +
          ' de los párrafos contiene más del máximo recomendado de 150 palabras.';
      }
    }
  }

  // voz_pasiva
  async getCalculoVozPasiva() {
    // voz_pasiva
    if (this.contador_parrafos < 1) {
      this.voz_pasiva.value = 0;
      this.voz_pasiva.error_msg =
        'No hay suficiente contenido: Por favor, añade algo de contenido para permitir un buen análisis.';
    } else if (this.contador_parrafos >= 1) {
      const array_frases: string[] = [];
      // Creo array de frases de los parrafos
      this.array_parrafos.forEach((parrafo: NewsContent) => {
        const parrafoLimpio = stripHtml(parrafo.contenido);
        const parrafo_en_frases: string[] = parrafoLimpio.split('.');
        parrafo_en_frases.forEach((frase: string) => {
          if (frase != '' && frase != ' ' && frase != ' .' && frase != '. ') {
            array_frases.push(frase.trim());
          }
        });
      });

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + userLoginStore.remember_token;

      try {
        const res = await axios({
          method: 'post',
          url: '/semaforo_seo/pasive_voice',
          headers: {
            'Content-Type': 'application/json',
          },
          data: array_frases,
        });

        // Proceso mensaje de error
        const porcentaje_pasive_voice: number = res.data;
        if (porcentaje_pasive_voice == 0) {
          this.voz_pasiva.value = 1;
          this.voz_pasiva.error_msg =
            'Ninguna de las frases tiene voz pasiva, el texto tiene buena legibilidad';
        }
        if (porcentaje_pasive_voice < 10) {
          // Green
          this.voz_pasiva.value = 1;
          this.voz_pasiva.error_msg =
            'Menos del 10% de las frases tiene voz pasiva, el texto tiene buena legibilidad. ¡Buen trabajo!';
        }
        if (porcentaje_pasive_voice >= 10 && porcentaje_pasive_voice < 15) {
          // Yellow
          this.voz_pasiva.value = 0.5;
          this.voz_pasiva.error_msg =
            'El ' +
            porcentaje_pasive_voice +
            '% de las frases contienen tiene voz pasiva, pero no supera el máximo recomendado del 15%.';
        }
        if (porcentaje_pasive_voice >= 15) {
          // Red
          this.voz_pasiva.value = 0;
          this.voz_pasiva.error_msg =
            'El ' +
            porcentaje_pasive_voice +
            '% de las frases contienen tiene voz pasiva y supera el máximo recomendado del 15%.';
        }
      } catch (err: any) {
        if (err.response.data.error != null) {
          err.response.data.error.forEach((element: any) => {
            $q.notify({
              type: 'negative',
              message: element,
              position: 'top',
            });
          });
          return;
        }

        $q.notify({
          type: 'negative',
          message:
            'No se pudo realizar el Análisis de Voz Pasiva en las frases de los parrafos, intente más tarde.',
          position: 'top',
        });
      }

      axios({
        method: 'post',
        url: '/semaforo_seo/pasive_voice',
        headers: {
          'Content-Type': 'application/json',
        },
        data: array_frases,
      })
        .then((res: any) => {
          // Proceso mensaje de error
          const porcentaje_pasive_voice: number = res.data;
          if (porcentaje_pasive_voice == 0) {
            // Green
            this.voz_pasiva.value = 1;
            this.voz_pasiva.error_msg =
              'Ninguna de las frases tiene voz pasiva, el texto tiene buena legibilidad';
          }
          if (porcentaje_pasive_voice < 10) {
            // Green
            this.voz_pasiva.value = 1;
            this.voz_pasiva.error_msg =
              'Menos del 10% de las frases tiene voz pasiva, el texto tiene buena legibilidad. ¡Buen trabajo!';
          }
          if (porcentaje_pasive_voice >= 10 && porcentaje_pasive_voice < 15) {
            // Yellow
            this.voz_pasiva.value = 0.5;
            this.voz_pasiva.error_msg =
              'El ' +
              porcentaje_pasive_voice +
              '% de las frases contienen tiene voz pasiva, pero no supera el máximo recomendado del 15%.';
          }
          if (porcentaje_pasive_voice >= 15) {
            // Red
            this.voz_pasiva.value = 0;
            this.voz_pasiva.error_msg =
              'El ' +
              porcentaje_pasive_voice +
              '% de las frases contienen tiene voz pasiva y supera el máximo recomendado del 15%.';
          }
        })
        .catch((err) => {
          if (err.response.data.error != null) {
            err.response.data.error.forEach((element: any) => {
              $q.notify({
                type: 'negative',
                message: element,
                position: 'top',
              });
            });
            return;
          }

          $q.notify({
            type: 'negative',
            message:
              'No se pudo realizar el Análisis de Voz Pasiva en las frases de los parrafos, intente más tarde.',
            position: 'top',
          });
        });
    }
  }
}
