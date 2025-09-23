<template>
  <q-layout view="hHh lpR fFf" container>
    <q-header>
      <q-toolbar class="bg-white text-black flex row items-center justify-between">
        <div class="flex no-wrap items-center">
          <q-toolbar-title class="text-bold">Registrar Noticia</q-toolbar-title>
          <!-- <q-btn flat v-on:click="openDialogSeoGeneral" dense>
            <q-icon size="1.6rem" :color="semaforoSeoGeneral.estadisticas.color">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <defs></defs>
                <path
                  class="cls-1"
                  d="M13.56 0H7a3.5 3.5 0 0 0-3.34 3.4v13.16A3.41 3.41 0 0 0 7.06 20h6.5A3.41 3.41 0 0 0 17 16.56V3.4A3.51 3.51 0 0 0 13.56 0zm1.9 16.08a2.37 2.37 0 0 1-2.35 2.37H7.52a2.37 2.37 0 0 1-2.35-2.37V3.86a2.37 2.37 0 0 1 2.35-2.37h5.59a2.37 2.37 0 0 1 2.35 2.37z"
                />
                <circle class="cls-1" cx="10.31" cy="9.98" r="2.15" />
                <circle class="cls-1" cx="10.31" cy="4.69" r="2.15" />
                <circle class="cls-1" cx="10.31" cy="15.31" r="2.15" />
              </svg>
            </q-icon>
          </q-btn>
          <q-btn flat v-on:click="openDialogSeoLegibilidad" dense>
            <q-icon size="1.6rem" :color="semaforoSeoLegibilidad.estadisticas.color">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M2.42 19.81a.11.11 0 1 0 .19.1C5.75 14.5 8.88 17 13.17 14.17c-2.92 0-3.72-1.56-3.72-1.56a7 7 0 0 0 5.26.39c1-.8 2.79-2.64 2.93-6.59a3.44 3.44 0 0 1-2.42.29 4.81 4.81 0 0 0 2.4-1.7 5.85 5.85 0 0 0-2.74-5c.79 10.33-9.17 5.88-11.67 18.29A12.55 12.55 0 0 1 9 11.78c2.83-1.49 5.15-2.93 6-6.71-.64 4.56-2.7 6.25-5.55 7.53-2.66 1.2-5.39 2.68-7.03 7.21z"
                />
              </svg>
            </q-icon>
          </q-btn> -->
        </div>
        <q-btn flat v-close-popup dense icon="close"></q-btn>
      </q-toolbar>
      <q-separator color="grey-8"></q-separator>
    </q-header>

    <q-footer>
      <q-separator color="grey-8"></q-separator>
      <q-toolbar class="bg-white text-black justify-end">
        <q-btn flat v-close-popup dense label="Cancelar" class="text-bold q-mr-sm"></q-btn>
        <q-btn
          dense
          color="positive"
          v-on:click="registrarNewNoticia"
          label="Guardar"
          class="text-bold"
        ></q-btn>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <q-page class="bg-white q-pa-sm row">
        <div class="col-xs-12 col-md-6 contenido-scroller">
          <div class="text-h6 text-bold text-center">Noticia</div>

          <div class="q-pa-xs">
            <q-input
              v-model="formNewNoticia.titulo"
              outlined
              label="Título"
              dense
              counter
              maxlength="150"
            >
              <template v-slot:prepend>
                <q-icon name="text_fields"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-pa-xs">
            <q-input
              v-model="formNewNoticia.subtitulo"
              outlined
              label="Subtítulo"
              dense
              counter
              maxlength="200"
            >
              <template v-slot:prepend>
                <q-icon name="text_fields"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-pa-xs">
            <q-input
              v-model="formNewNoticia.seo_url"
              outlined
              label="SEO URL"
              dense
              counter
              maxlength="200"
            >
              <template v-slot:prepend>
                <q-icon name="link"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-pa-xs">
            <q-input
              v-model="formNewNoticia.keywords"
              outlined
              label="Keywords"
              dense
              counter
              maxlength="200"
            >
              <template v-slot:prepend>
                <q-icon name="text_fields"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-pa-xs flex row justify-between">
            <div class="column" v-if="$q.screen.gt.xs">
              <div
                v-if="formNewNoticia.img_url_blob === null || formNewNoticia.img_url === ''"
                class="col flex justify-center items-center q-mr-sm q-mb-sm"
                style="
                  border-radius: 0.5rem;
                  max-width: 200px;
                  min-width: 200px;
                  max-height: 200px;
                  min-height: 200px;
                  overflow: hidden;
                  border: 1px solid #c2c2c2;
                "
              >
                <q-icon name="image" color="grey-7" size="6rem"></q-icon>
              </div>
              <q-img
                v-else
                :src="formNewNoticia.img_url"
                spinner-color="primary"
                fit="contain"
                class="q-mr-sm"
                style="
                  border-radius: 0.5rem;
                  max-width: 200px;
                  min-width: 200px;
                  max-height: 200px;
                  min-height: 200px;
                  border: 1px solid #c2c2c2;
                "
              >
                <div
                  class="absolute-top-right flex column"
                  style="padding: 3px; background-color: transparent"
                >
                  <q-btn
                    @click="dialogCropImagenNoticia = true"
                    size="12px"
                    dense
                    icon="crop"
                    class="bg-white text-black"
                  ></q-btn>
                </div>
              </q-img>
            </div>
            <div class="col row justify-between q-ml-xs">
              <div class="column col-12">
                <div class="flex justify-center" v-if="!$q.screen.gt.xs">
                  <div
                    v-if="formNewNoticia.img_url_blob === null || formNewNoticia.img_url === ''"
                    class="col flex justify-center items-center q-mr-sm q-mb-sm"
                    style="
                      border-radius: 0.5rem;
                      max-width: 275px;
                      min-width: 275px;
                      max-height: 275px;
                      min-height: 275px;
                      overflow: hidden;
                      border: 1px solid #c2c2c2;
                    "
                  >
                    <q-icon name="image" color="grey-7" size="6rem"></q-icon>
                  </div>
                  <q-img
                    v-else
                    :src="formNewNoticia.img_url"
                    spinner-color="primary"
                    fit="contain"
                    class="q-mb-sm"
                    style="
                      border-radius: 0.5rem;
                      max-width: 275px;
                      min-width: 275px;
                      max-height: 275px;
                      min-height: 275px;
                      border: 1px solid #c2c2c2;
                    "
                  >
                    <div
                      class="absolute-top-right flex column"
                      style="padding: 3px; background-color: transparent"
                    >
                      <q-btn
                        @click="dialogCropImagenNoticia = true"
                        size="12px"
                        dense
                        icon="crop"
                        class="bg-white text-black"
                      ></q-btn>
                    </div>
                  </q-img>
                </div>
                <q-file
                  name="addNoticiaPortada"
                  v-model="formNewNoticia.img_url_blob"
                  outlined
                  dense
                  label="Foto de Portada"
                  accept=".jpg, image/*"
                  @update:model-value="convertImageToURL"
                  max-file-size="20971520"
                  @rejected="onRejected"
                >
                  <template v-slot:prepend>
                    <q-icon name="add_photo_alternate" />
                  </template>
                </q-file>

                <div class="q-py-xs">
                  <q-input
                    v-model="formNewNoticia.img_description"
                    outlined
                    label="Mención o fuente de la Portada"
                    dense
                    counter
                    maxlength="150"
                  >
                    <template v-slot:prepend>
                      <q-icon name="chat"></q-icon>
                    </template>
                  </q-input>
                </div>

                <q-separator spaced></q-separator>

                <q-input
                  v-model="formNewNoticia.publish_date"
                  outlined
                  label="Fecha de Publicación"
                  dense
                  mask="####-##-## ##:##"
                  fill-mask
                  class="q-mt-sm"
                  hint="Se publica inmediatamente si no se designa una fecha"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formNewNoticia.publish_date" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="OK" flat></q-btn>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                    <q-icon name="timer" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time
                          v-model="formNewNoticia.publish_date"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="OK" flat></q-btn>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-toggle v-model="formNewNoticia.status" color="positive" class="q-mt-sm"
                  ><b>Estado de Noticia</b></q-toggle
                >
              </div>
            </div>
          </div>
        </div>

        <div class="row flex col-xs-12 col-md-6 items-start">
          <div class="col-12 contenido-scroller">
            <div class="column col-12">
              <div class="col-12 text-h6 text-bold text-center">Contenido</div>

              <div
                class="col-12 q-pa-xs flex column"
                v-for="(itemContenido, index) in formNewNoticia.news_content"
                :style="{ order: itemContenido.position }"
              >
                <div class="col-xs-12 q-pa-xs flex justify-between items-center">
                  <div class="text-bold flex items-center">
                    <span class="q-mr-sm"># {{ itemContenido.position }}</span>
                    <!-- <q-select
                        class="select-small"
                        style="min-height: 20px !important;"
                        dense
                        outlined
                        v-model="itemContenido.tipo"
                        :options="tiposContenido"
                        emit-value
                        map-options
                      ></q-select> -->
                  </div>
                  <div>
                    <q-btn
                      size="sm"
                      dense
                      class="q-mr-xs"
                      icon="move_up"
                      @click="moverContenido(index, false)"
                      :disable="itemContenido.position <= 1"
                    ></q-btn>
                    <q-btn
                      size="sm"
                      dense
                      class="q-mr-xs"
                      icon="move_down"
                      @click="moverContenido(index, true)"
                      :disable="itemContenido.position >= formNewNoticia.news_content.length"
                    ></q-btn>
                    <q-btn
                      size="sm"
                      dense
                      class="q-mr-xs"
                      icon="add"
                      @click="agregarContenido(itemContenido.position)"
                    ></q-btn>
                    <q-btn size="sm" dense>
                      <q-icon name="delete" color="red" @click="eliminarContenido(index)"></q-icon>
                    </q-btn>
                  </div>
                </div>
                <div
                  class="col-xs-12 q-pa-xs row justify-center items-center"
                  style="border-radius: 0.5rem; border: 1px solid #c2c2c2"
                >
                  <q-select
                    class="col-12 text-caption"
                    label="Tipo de Contenido"
                    dense
                    outlined
                    v-model="itemContenido.tipo"
                    :options="tiposContenido"
                    :disable="itemContenido.contenido.length > 0 || itemContenido.file != null"
                    emit-value
                    map-options
                  ></q-select>
                  <q-separator class="col-12" spaced size="1px"></q-separator>
                  <div class="col-12">
                    <q-editor
                      v-if="itemContenido.tipo === 1"
                      v-model="itemContenido.contenido"
                      :toolbar="[
                        [
                          /* {
                              label: $q.lang.editor.formatting,
                              icon: $q.iconSet.editor.formatting,
                              list: 'no-icons',
                              options: ['h1','h2','h3','h4','p']
                            }, */
                          {
                            label: $q.lang.editor.defaultFont,
                            icon: $q.iconSet.editor.font,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'default_font',
                              'arial',
                              'arial_black',
                              'comic_sans',
                              'courier_new',
                              'impact',
                              'lucida_grande',
                              'times_new_roman',
                              'verdana',
                              'nike',
                              'amsi_pro_regular',
                            ],
                          },
                          {
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: false,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                              'size-1',
                              'size-2',
                              'size-3',
                              'size-4',
                              'size-5',
                              'size-6',
                              'size-7',
                            ],
                          },
                        ],
                        ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
                        [
                          {
                            icon: $q.iconSet.editor.align,
                            fixedLabel: true,
                            list: 'only-icons',
                            options: ['left', 'center', 'right', 'justify'],
                          },
                          'unordered',
                          'ordered',
                          'outdent',
                          'indent',
                          'quote',
                          'link',
                        ],
                        ['undo', 'redo', 'fullscreen'],
                      ]"
                      :fonts="{
                        arial: 'Arial',
                        arial_black: 'Arial Black',
                        comic_sans: 'Comic Sans MS',
                        courier_new: 'Courier New',
                        impact: 'Impact',
                        lucida_grande: 'Lucida Grande',
                        times_new_roman: 'Times New Roman',
                        verdana: 'Verdana',
                        nike: 'nike',
                        amsi_pro_regular: 'src/assets/fonts/amsi_pro_regular.ttf',
                      }"
                    >
                    </q-editor>
                    <div v-else-if="itemContenido.tipo >= 2 && itemContenido.tipo <= 4" class="row">
                      <div
                        v-if="itemContenido.tipo == 2 && itemContenido.img_url == ''"
                        :class="$q.screen.lt.sm ? 'col-12 q-pb-sm' : 'col-3 q-pr-sm'"
                      >
                        <div
                          class="flex justify-center items-center"
                          style="
                            border-radius: 0.3rem;
                            min-height: 100%;
                            overflow: hidden;
                            border: 1px solid #c2c2c2;
                          "
                        >
                          <q-icon name="image" color="grey-7" size="4rem"></q-icon>
                        </div>
                      </div>
                      <div
                        v-else-if="itemContenido.tipo == 2 && itemContenido.img_url != ''"
                        class="flex justify-center items-center"
                        :class="$q.screen.lt.sm ? 'col-12 q-pb-xs' : 'col-3 q-pr-xs'"
                      >
                        <q-img
                          :src="itemContenido.img_url"
                          :ratio="1"
                          fit="contain"
                          style="
                            border-radius: 0.3rem;
                            min-height: 160px;
                            max-height: 160px;
                            overflow: hidden;
                            border: 1px solid #c2c2c2;
                          "
                        >
                          <div
                            class="absolute-top-right flex column"
                            style="padding: 3px; background-color: transparent"
                          >
                            <q-btn
                              @click="openDialogCroppedNewsContentImage(itemContenido)"
                              size="12px"
                              dense
                              icon="crop"
                              class="bg-white text-black"
                            ></q-btn>
                          </div>
                        </q-img>
                      </div>
                      <div :class="$q.screen.lt.sm ? 'col-12' : 'col'">
                        <q-file
                          v-if="itemContenido.tipo == 2"
                          v-model="itemContenido.file"
                          outlined
                          dense
                          label="Seleccionar Imagen"
                          @update:model-value="
                            (files: any) => {
                              convertImageToURLNoticiaContenido(files, itemContenido);
                            }
                          "
                          max-file-size="20971520"
                          @rejected="onRejected"
                        >
                          <template v-slot:prepend>
                            <q-icon name="image" />
                          </template>
                        </q-file>
                        <q-file
                          v-else-if="itemContenido.tipo == 3 || itemContenido.tipo == 4"
                          v-model="itemContenido.file"
                          outlined
                          dense
                          :label="'Seleccionar ' + (itemContenido.tipo == 3 ? 'Video' : 'Audio')"
                          @update:model-value="
                            (files: any) => {
                              convertImageToURLNoticiaContenido(files, itemContenido);
                            }
                          "
                        >
                          <template v-slot:prepend>
                            <q-icon v-if="itemContenido.tipo == 3" name="movie" />
                            <q-icon v-else-if="itemContenido.tipo == 4" name="music_note" />
                          </template>
                        </q-file>
                        <q-input
                          class="q-mt-sm"
                          outlined
                          dense
                          v-model="itemContenido.descripcion"
                          label="Mención o Fuente"
                        >
                          <template v-slot:prepend>
                            <q-icon name="chat" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <q-input
                      v-else
                      outlined
                      dense
                      v-model="itemContenido.contenido"
                      type="textarea"
                    ></q-input>
                  </div>
                </div>
              </div>

              <div
                class="q-pa-xs row col-xs-12"
                :style="{ order: formNewNoticia.news_content.length + 1 }"
              >
                <div
                  class="col-xs-12 q-pa-xs flex justify-center items-center"
                  style="border-radius: 0.5rem; border: 2px dashed #c2c2c2"
                >
                  <q-btn
                    flat
                    icon="add_circle"
                    @click="agregarContenido(formNewNoticia.news_content.length + 1)"
                    round
                    color="grey-7"
                  ></q-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

  <q-dialog v-model="loadingAxios" persistent>
    <q-spinner color="white" size="5rem"></q-spinner>
  </q-dialog>

  <!-- <q-dialog v-model="dialogSeoGeneral" persistent>
    <SemaforoSeoGeneral
      :semaforoSeoGeneralAux="semaforoSeoGeneralAux"
      :colorSemaforo="semaforoSeoGeneral.estadisticas.color"
    ></SemaforoSeoGeneral>
  </q-dialog>
  <q-dialog v-model="dialogSeoLegibilidad" persistent>
    <SemaforoSeoLegibilidad
      :semaforoSeoLegibilidadAux="semaforoSeoLegibilidadAux"
      :colorSemaforo="semaforoSeoLegibilidad.estadisticas.color"
    ></SemaforoSeoLegibilidad>
  </q-dialog>

  <q-dialog v-model="dialogCropImagenNoticia" full-height full-width persistent>
    <CropperDialog
      @on-done="cropImagenNoticiaTerminado"
      :urlFilePhoto="formNewNoticia.img_url"
      cancelable
      ratioSeleccionable
    ></CropperDialog>
  </q-dialog>

  <q-dialog v-model="dialogCropImagenNoticiaContenido" full-height full-width persistent>
    <CropperDialog
      @on-done="cropImagenNoticiaContenidoTerminado"
      :urlFilePhoto="stringImagenNoticiaContenidoToCropAux"
      cancelable
      ratioSeleccionable
    ></CropperDialog>
  </q-dialog> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

/* import CropperDialog from 'src/components/CropperDialog.vue';
import SemaforoSeoGeneral from 'src/components/news_forms/SemaforoSeoGeneral.vue';
import SemaforoSeoLegibilidad from 'src/components/news_forms/SemaforoSeoLegibilidad.vue'; */

import { News, NewsContent } from 'src/interfaces/noticias';

/*   import { compressImagen } from 'src/utils/compressImagen';
import { SemaforoGeneral } from 'src/utils/semaforoSeoGeneral'
  import { SemaforoLegibilidad } from 'src/utils/semaforoSeoLegibilidad' */

import { userLoginHandler } from 'src/stores/UserLoginHandler';

import { useQuasar } from 'quasar';
const $q = useQuasar();

const userLoginStore = userLoginHandler();

/* const semaforoGeneral = new SemaforoGeneral();
const semaforoLegibilidad = new SemaforoLegibilidad(); */

const formNewNoticia = ref<News>({
  id: 0,
  titulo: '',
  subtitulo: '',
  seo_url: '',
  img_url: '',
  img_description: '',
  img_url_blob: null,
  keywords: '',
  status: true,
  publish_date: '',
  news_content: [],
});

const tiposContenido = [
  { value: 1, label: 'Texto' },
  { value: 2, label: 'Imagen' },
  { value: 3, label: 'Video' },
  { value: 4, label: 'Sonido' },
  { value: 5, label: 'IFrame Integrado' },
];

const nombreRespaldoImagenPortada = ref('');
const tipoRespaldoImagenPortada = ref('');

const nombreRespaldoImagenPortadaImagenNoticiaContenido = ref('');
const tipoRespaldoImagenPortadaImagenNoticiaContenido = ref('');

/* CROPPER DE IMAGEN DE NOTICIA */
const dialogCropImagenNoticia = ref(false);

const convertImageToURL = (files: any) => {
  formNewNoticia.value.img_url_blob = files;
  if (files == null) {
    formNewNoticia.value.img_url = '';
    nombreRespaldoImagenPortada.value = '';
    tipoRespaldoImagenPortada.value = '';
    return;
  }

  nombreRespaldoImagenPortada.value = files.name;
  tipoRespaldoImagenPortada.value = files.type;
  formNewNoticia.value.img_url = URL.createObjectURL(formNewNoticia.value.img_url_blob!);
};

const cropImagenNoticiaTerminado = ({ urlFilePhotoCropped, croppedImageBlob }: any) => {
  formNewNoticia.value.img_url = urlFilePhotoCropped;
  formNewNoticia.value.img_url_blob = new File(
    [croppedImageBlob],
    nombreRespaldoImagenPortada.value,
    { type: tipoRespaldoImagenPortada.value },
  );

  dialogCropImagenNoticia.value = false;
};

/* REGISTRO DE NOTICIA */
const loadingAxios = ref(false);
const emit = defineEmits(['onDone']);

const registrarNewNoticia = async () => {
  loadingAxios.value = true;

  let formData = new FormData();
  formData.append('titulo', formNewNoticia.value.titulo);
  formData.append('subtitulo', formNewNoticia.value.subtitulo);
  formData.append('img_description', formNewNoticia.value.img_description);
  formData.append('seo_url', formNewNoticia.value.seo_url);
  formData.append('keywords', formNewNoticia.value.keywords);
  formData.append('status', formNewNoticia.value.status ? '1' : '0');
  formData.append('publish_date', formNewNoticia.value.publish_date);
  if (formNewNoticia.value.img_url_blob != null) {
    let imagenComprimida = await compressImagen(formNewNoticia.value.img_url_blob as File);
    // console.log(imagenComprimida);
    formData.append('img_url_blob', imagenComprimida);
  }

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + userLoginStore.remember_token;

  axios({
    method: 'post',
    url: '/news/register',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Content-Disposition': 'form-data',
    },
    data: formData,
  })
    .then(async (res: any) => {
      let news_id_to_register = res.data.data.id;

      $q.notify({
        type: 'positive',
        message: res.data.message,
        position: 'top',
      });

      if (formNewNoticia.value.news_content.length > 0) {
        await registrarContenidoNoticia(news_id_to_register);
      }

      formNewNoticia.value.titulo = '';
      formNewNoticia.value.subtitulo = '';
      formNewNoticia.value.seo_url = '';
      formNewNoticia.value.img_url = '';
      formNewNoticia.value.img_description = '';
      formNewNoticia.value.keywords = '';
      formNewNoticia.value.status = true;
      formNewNoticia.value.publish_date = '';

      loadingAxios.value = false;
      emit('onDone');
    })
    .catch((err) => {
      loadingAxios.value = false;

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
        message: 'No se pudo registrar la Noticia, intente más tarde.',
        position: 'top',
      });
    });
};

/* REGISTRO DE CONTENIDO DE NOTICIA */
const registrarContenidoNoticia = async (idNoticia: number) => {
  let arrayPeticionesRegisterNewsContent: any[] = [];

  formNewNoticia.value.news_content.forEach((news_content) => {
    let formDataNewsContent = new FormData();
    if (news_content.tipo === 1 || news_content.tipo === 5) {
      formDataNewsContent.append('contenido', news_content.contenido);
    }
    if (news_content.tipo === 2) {
      // IMG
      console.log(news_content);

      formDataNewsContent.append('img_url_blob', news_content.file);
    }
    if (news_content.tipo === 3) {
      // VIDEO
      formDataNewsContent.append('video_url_blob', news_content.file);
    }
    if (news_content.tipo === 4) {
      // AUDIO
      formDataNewsContent.append('audio_url_blob', news_content.file);
    }
    formDataNewsContent.append('descripcion', news_content.descripcion.toString());
    formDataNewsContent.append('position', news_content.position.toString());
    formDataNewsContent.append('tipo', news_content.tipo.toString());

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userLoginStore.remember_token;

    arrayPeticionesRegisterNewsContent.push(
      axios({
        method: 'post',
        url: '/news_content/register/' + idNoticia.toString(),
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data',
        },
        responseType: 'json',
        data: formDataNewsContent,
      }),
    );
  });

  try {
    let responses = await Promise.all(arrayPeticionesRegisterNewsContent);

    let mensaje = 'Se registraron correctamente los Componentes de la Noticia.';

    $q.notify({
      type: 'positive',
      message: mensaje,
      position: 'top',
    });

    formNewNoticia.value.news_content = [];
  } catch (err: any) {
    loadingAxios.value = false;
    if (err.response.data.error != null) {
      err.response.data.error.forEach((element: any) => {
        $q.notify({
          type: 'negative',
          message: element,
          position: 'top',
        });
      });
    }

    $q.notify({
      type: 'negative',
      message:
        'No se pudo registrar correctamente los Componentes de la Noticia, intente más tarde.',
      position: 'top',
    });
  }
};

/* CONTENIDO DE LA NOTICIA */
const convertImageToURLNoticiaContenido = (files: any, news_content: any) => {
  news_content.file = files;
  if (files == null) {
    nombreRespaldoImagenPortadaImagenNoticiaContenido.value = '';
    tipoRespaldoImagenPortadaImagenNoticiaContenido.value = '';
    news_content.img_url = '';
    return;
  }
  nombreRespaldoImagenPortadaImagenNoticiaContenido.value = files.name;
  tipoRespaldoImagenPortadaImagenNoticiaContenido.value = files.type;
  news_content.img_url = URL.createObjectURL(news_content.file!);
};

let stringImagenNoticiaContenidoToCropAux: string = '';
let newsContentImagenNoticiaContenidoToCropAux: any = [];
const dialogCropImagenNoticiaContenido = ref(false);

const openDialogCroppedNewsContentImage = (news_content: any) => {
  stringImagenNoticiaContenidoToCropAux = news_content.img_url;
  newsContentImagenNoticiaContenidoToCropAux = news_content;
  dialogCropImagenNoticiaContenido.value = true;
};

const cropImagenNoticiaContenidoTerminado = ({ urlFilePhotoCropped, croppedImageBlob }: any) => {
  newsContentImagenNoticiaContenidoToCropAux.img_url = urlFilePhotoCropped;
  newsContentImagenNoticiaContenidoToCropAux.img_url_blob = new File(
    [croppedImageBlob],
    nombreRespaldoImagenPortadaImagenNoticiaContenido.value,
    { type: tipoRespaldoImagenPortadaImagenNoticiaContenido.value },
  );

  formNewNoticia.value.news_content.forEach((itemContenido: any) => {
    if (itemContenido.position === newsContentImagenNoticiaContenidoToCropAux.position) {
      itemContenido.img_url = newsContentImagenNoticiaContenidoToCropAux.img_url;
      itemContenido.img_url_blob = newsContentImagenNoticiaContenidoToCropAux.img_url_blob;
      itemContenido.file = newsContentImagenNoticiaContenidoToCropAux.img_url_blob;
    }
  });
  stringImagenNoticiaContenidoToCropAux = '';
  newsContentImagenNoticiaContenidoToCropAux = [];

  dialogCropImagenNoticiaContenido.value = false;
};

// Movimiento de los contenidos
const agregarContenido = (position: number) => {
  if (position > 0) {
    formNewNoticia.value.news_content.forEach((itemContenido: any) => {
      if (itemContenido.position >= position) {
        itemContenido.position++;
      }
    });
  }

  formNewNoticia.value.news_content.push({
    id: formNewNoticia.value.news_content.length,
    position: position,
    position_anterior: position,
    tipo: 1,
    tipo_anterior: 1,
    contenido: '',
    contenido_anterior: '',
    descripcion: '',
    descripcion_anterior: '',
    file: null,
    img_url: '',
  });
};

const eliminarContenido = (index: number) => {
  if (formNewNoticia.value.news_content.length <= index) {
    return;
  }

  let contenidoEliminar = JSON.parse(JSON.stringify(formNewNoticia.value.news_content[index]));
  let position = contenidoEliminar.position;

  let nuevoArrayItems: NewsContent[] = [];
  for (var index = 0; index < formNewNoticia.value.news_content.length; index++) {
    let itemPosition = formNewNoticia.value.news_content[index].position;

    if (itemPosition !== position) {
      let itemNuevo = JSON.parse(JSON.stringify(formNewNoticia.value.news_content[index]));

      if (itemPosition > position) {
        itemNuevo.position = itemNuevo.position - 1;
      }

      nuevoArrayItems.push(itemNuevo);
    }
  }

  formNewNoticia.value.news_content = nuevoArrayItems;
};

const moverContenido = (index: number, isDown: boolean) => {
  if (formNewNoticia.value.news_content.length <= index) {
    return;
  }

  let contenidoModificar = formNewNoticia.value.news_content[index];
  let position = contenidoModificar.position;

  if (isDown) {
    let itemPosition = formNewNoticia.value.news_content.find(
      (itemContenido) => itemContenido.position === position + 1,
    );
    if (itemPosition === null) {
      return;
    }

    itemPosition!.position = position;
    contenidoModificar.position = position + 1;
  } else {
    let itemPosition = formNewNoticia.value.news_content.find(
      (itemContenido) => itemContenido.position === position - 1,
    );
    if (itemPosition === null) {
      return;
    }

    itemPosition!.position = position;
    contenidoModificar.position = position - 1;
  }
};

const onRejected = (rejectedEntries: any) => {
  $q.notify({
    type: 'negative',
    message: 'La Imagen no puede tener un peso mayor de 20 Mb',
    position: 'top',
  });
};

/* YOAST SEO STUFF Semaforo  */
/* const dialogSeoGeneral = ref(false);
const dialogSeoLegibilidad = ref(false);
let semaforoSeoGeneralAux: any[] = [];
const semaforoSeoGeneral = ref<any>(semaforoGeneral.getResultadosComoObjeto());

let semaforoSeoLegibilidadAux: any[] = [];
const semaforoSeoLegibilidad = ref<any>(semaforoLegibilidad.getResultadosComoObjeto());

const openDialogSeoGeneral = () => {
  semaforoGeneral.procesar(formNewNoticia.value);
  semaforoSeoGeneral.value = semaforoGeneral.getResultadosComoObjeto();
  semaforoSeoGeneralAux = semaforoGeneral.getResultadosComoArray();
  dialogSeoGeneral.value = true;
};
const openDialogSeoLegibilidad = async () => {
  await semaforoLegibilidad.procesar(formNewNoticia.value);
  semaforoSeoLegibilidad.value = semaforoLegibilidad.getResultadosComoObjeto();
  semaforoSeoLegibilidadAux = semaforoLegibilidad.getResultadosComoArray();
  dialogSeoLegibilidad.value = true;
}; */

/* watch(formEditNoticia.value.news_content, (newValue, oldValue) => {
    console.log(newValue);
    console.log(oldValue);
  }); */

/* watch(formEditNoticia.value.titulo, (newValue:string, oldValue:string) => {
    console.log(newValue);
    console.log(oldValue);
  });
  */

/* const calculoSemaforoGeneralCall = () => {
    semaforoGeneral.procesar(formNewNoticia.value)
    semaforoSeoGeneral.value = semaforoGeneral.getResultadosComoObjeto()
  }

  const calculoSemaforoLegibilidadCall = async () => {
    await semaforoLegibilidad.procesar(formNewNoticia.value)
    semaforoSeoLegibilidad.value = semaforoLegibilidad.getResultadosComoObjeto()
  } */
</script>

<style scoped>
.contenido-scroller {
  overflow: auto;
  min-height: 300px;
  max-height: calc(100vh - 170px);
}

.q-editor,
.q-editor__toolbars-container {
  min-width: 200px !important;
  max-width: calc(50vw - 58px) !important;
}

.q-editor__toolbars-container {
  overflow-x: auto;
}

@media (max-width: 1024px) {
  .contenido-scroller {
    overflow-y: auto;
    min-height: auto;
    max-height: none;
  }
  .q-editor,
  .q-editor__toolbars-container {
    max-width: calc(100vw - 80px) !important;
  }
}
</style>
