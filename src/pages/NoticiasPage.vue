<template>
  <q-page class="q-pa-none">
    <div :class="'q-pa-' + ($q.screen.lt.sm ? 'none' : 'md')" style="padding-top: 64px">
      <q-table
        ref="newsTable"
        :columns="columnsNoticias"
        :rows="rowsNoticias"
        :loading="loadingAxios"
        selection="multiple"
        v-model:selected="noticiasSelected"
        :grid="$q.screen.xs"
        grid-header
        v-model:pagination="noticiasPagination"
        :filter="textSearchNoticias"
        rows-per-page-label="Records por página"
        no-data-label="No se encontraron registros"
        @request="onRequest"
      >
        <template v-slot:item="props">
          <div
            class="q-pl-sm q-pr-sm q-pb-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card class="bg-white">
              <q-card-section class="q-pt-sm q-pb-sm flex justify-between items-center no-wrap">
                <!-- <q-checkbox dense v-model="props.selected" :label="'Id: ' + props.row.id" color="primary" class="text-bold"></q-checkbox> -->
                <q-checkbox
                  dense
                  v-model="props.selected"
                  :label="props.row.titulo"
                  color="primary"
                  class="text-bold"
                ></q-checkbox>
                <q-toggle
                  v-model="props.row.status"
                  :color="props.row.status ? 'green' : 'red'"
                  disable
                ></q-toggle>
              </q-card-section>
              <q-separator color="grey-8"></q-separator>
              <q-list dense class="q-pb-sm">
                <q-item
                  v-for="col in props.cols.filter(
                    (c: any) =>
                      c.name != 'id' &&
                      c.name != 'img_url' &&
                      c.name != 'titulo' &&
                      c.name != 'status',
                  )"
                  :key="col.name"
                >
                  <q-item-section v-if="col.name != 'subtitulo'">
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section v-if="col.name == 'subtitulo'">
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    <div
                      class="text-grey-7"
                      style="overflow-wrap: break-word; line-break: anywhere"
                    >
                      {{ props.row.subtitulo }}
                    </div>
                  </q-item-section>
                  <q-item-section v-else-if="col.name == 'cantidad_contenido'">
                    <div class="text-right text-grey-7">
                      {{ props.row.news_content.length }} Elementos
                    </div>
                  </q-item-section>
                  <q-item-section v-else-if="col.name == 'status'" side>
                    <div class="flex items-center justify-center">
                      <q-toggle
                        v-model="props.row.status"
                        :color="props.row.status ? 'green' : 'red'"
                        disable
                      ></q-toggle>
                    </div>
                  </q-item-section>
                  <q-item-section v-else-if="col.name == 'publish_date'" side>
                    <div class="flex items-center justify-center">
                      <span>
                        {{ new Date(props.row.publish_date).toLocaleString('es-ES') }}
                      </span>
                    </div>
                  </q-item-section>
                  <q-item-section v-else-if="col.name == 'created_at'" side>
                    <div class="flex items-center justify-center">
                      <span>
                        {{ new Date(props.row.created_at).toLocaleString('es-ES') }}
                      </span>
                    </div>
                  </q-item-section>
                  <q-item-section
                    v-else
                    class="text-right text-grey-7"
                    style="overflow-wrap: break-word"
                  >
                    <q-item-label>{{ col.value }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-img
                  :src="computedRutaImgWithQueryParams(props.row.img_url)"
                  spinner-color="primary"
                  fit="contain"
                  style="min-height: 150px; max-height: 150px"
                ></q-img>
              </q-list>
            </q-card>
          </div>
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td style="padding: 0.5rem">
            <q-img
              :src="computedRutaImgWithQueryParams(props.row.img_url)"
              spinner-color="primary"
              fit="contain"
              style="min-height: 64px; max-height: 64px"
            ></q-img>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <div class="flex items-center justify-center">
              <span v-if="props.row.status === true">
                <q-toggle v-model="props.row.status" color="green" disable></q-toggle>
              </span>
              <span v-else-if="props.row.status === false">
                <q-toggle v-model="props.row.status" color="red" disable></q-toggle>
              </span>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-created_at="props">
          <q-td :props="props">
            <div class="flex items-center justify-center">
              <span>
                <!-- {{ fechaFormateada(props.row.created_at) }} -->
                {{ new Date(props.row.created_at).toLocaleString('es-ES') }}
              </span>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-publish_date="props">
          <q-td :props="props">
            <div class="flex items-center justify-center">
              <span>
                {{ new Date(props.row.publish_date).toLocaleString('es-ES') }}
              </span>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-page-sticky expand position="top" style="z-index: 1">
      <q-toolbar class="flex justify-center text-h6 bg-white text-black">
        <q-input
          v-model="textSearchNoticias"
          debounce="500"
          outlined
          dense
          label="Búsqueda"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="search"> </q-icon>
          </template>
        </q-input>
        <q-space />
        <q-btn
          dense
          v-on:click="dialogRegistrarNoticia = true"
          class="bg-positive text-white q-mr-xs"
          icon="add"
        ></q-btn>
        <q-btn
          dense
          :disable="noticiasSelected.length != 1"
          v-on:click="dialogEditNoticia = true"
          class="bg-warning text-white q-mr-xs"
          icon="edit"
        ></q-btn>
        <q-btn
          dense
          :disable="noticiasSelected.length == 0"
          v-on:click="dialogDeleteNoticia = true"
          class="bg-negative text-white"
          icon="delete"
        ></q-btn>
      </q-toolbar>
    </q-page-sticky>
  </q-page>

  <q-dialog v-model="loadingAxios" persistent>
    <q-spinner color="white" size="5rem"></q-spinner>
  </q-dialog>

  <q-dialog v-model="dialogRegistrarNoticia" full-width persistent>
    <RegistrarNoticiaForm @on-done="cerrarRegistroNoticia"></RegistrarNoticiaForm>
  </q-dialog>

  <!-- <q-dialog v-model="dialogEditNoticia" full-width persistent>
    <EditNoticiaForm
      @on-done="cerrarEditNoticia"
      @on-cancel="cerrarEditNoticia"
      :noticiaSelected="JSON.parse(JSON.stringify(noticiasSelected[0]))"
    ></EditNoticiaForm>
  </q-dialog>

  <q-dialog v-model="dialogDeleteNoticia" persistent>
    <DeleteNoticiaForm
      @on-done="cerrarDeleteNoticia"
      :noticiasSelected="noticiasSelected"
    ></DeleteNoticiaForm>
  </q-dialog> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import RegistrarNoticiaForm from 'src/components/news_forms/RegistrarNoticiaForm.vue';
/* import EditNoticiaForm from 'src/components/news_forms/EditNoticiaForm.vue';
import DeleteNoticiaForm from 'src/components/news_forms/DeleteNoticiaForm.vue'; */

import type { QTableColumn } from 'quasar';
import { date } from 'quasar';

import axios from 'axios';

import { type News } from 'src/interfaces/noticias';

import { userLoginHandler } from 'src/stores/UserLoginHandler';

const userLoginStore = userLoginHandler();

const noticiasSelected = ref<News[]>([]);
const rowsNoticias = ref<News[]>([]);

const columnsNoticias = <QTableColumn[]>[
  {
    name: 'titulo',
    required: true,
    label: 'Título',
    align: 'left',
    field: 'titulo',
    sortable: true,
    style:
      'min-width: 275px; max-width: 275px; white-space: inherit !important; overflow-wrap: break-word;',
  },
  {
    name: 'subtitulo',
    align: 'left',
    label: 'Subtítulo',
    field: 'subtitulo',
    sortable: true,
    style:
      'min-width: 275px; max-width: 275px; white-space: inherit !important; overflow-wrap: break-word;',
  },
  {
    name: 'seo_url',
    align: 'left',
    label: 'SEO URL',
    field: 'seo_url',
    style:
      'min-width: 275px; max-width: 275px; white-space: inherit !important; overflow-wrap: break-word;',
  },
  { name: 'img_url', align: 'left', label: 'Img', field: 'img_url' },
  { name: 'status', align: 'left', label: 'Estado', field: 'status' },
  {
    name: 'keywords',
    align: 'left',
    label: 'Keywords',
    field: 'keywords',
    style:
      'min-width: 275px; max-width: 275px; white-space: inherit !important; overflow-wrap: break-word;',
  },
  {
    name: 'cantidad_contenido',
    align: 'left',
    label: 'Contenido',
    field: (row: any) => row.news_content.length,
    sortable: true,
  },
  {
    name: 'publish_date',
    align: 'left',
    label: 'Fecha Publicación',
    field: 'publish_date',
    sortable: true,
  },
  { name: 'created_at', align: 'left', label: 'Fecha', field: 'created_at', sortable: true },
];

interface NoticiasPagination {
  page?: number;
  rowsPerPage?: number;
  rowsNumber?: number;
  sortBy?: string | null;
  descending?: boolean;
}

export default defineComponent({
  name: 'Noticias',
  components: {
    RegistrarNoticiaForm,
    /* EditNoticiaForm,
    DeleteNoticiaForm, */
  },
  setup() {
    return {
      loadingAxios: ref(false),

      // Tabla Noticias
      columnsNoticias: ref(columnsNoticias),
      rowsNoticias: ref(rowsNoticias),
      noticiasSelected: ref(noticiasSelected),
      textSearchNoticias: ref(''),

      // Dialog Registrar
      dialogRegistrarNoticia: ref(false),
      // Dialog Edit
      dialogEditNoticia: ref(false),
      // Dialog Delete
      dialogDeleteNoticia: ref(false),

      noticiasPagination: ref<NoticiasPagination>({
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 10,
        sortBy: null,
        descending: false,
      }),
    };
  },
  mounted() {
    (this.$refs.newsTable as any).requestServerInteraction();
  },

  methods: {
    async onRequest(props: any) {
      const { page, rowsPerPage, sortBy, descending /* , rowsNumber */ } = props.pagination;
      const filter = props.filter;

      this.loadingAxios = true;

      const newsTotal = await this.getListadoNewsByPagination(
        (page - 1) * rowsPerPage,
        rowsPerPage as number,
        filter && filter.trim().length > 0 ? (filter as string) : null,
      );
      this.noticiasSelected = [];

      this.noticiasPagination.page = page;
      this.noticiasPagination.rowsPerPage = rowsPerPage;
      this.noticiasPagination.rowsNumber = newsTotal;
      this.noticiasPagination.sortBy = sortBy;
      this.noticiasPagination.descending = descending;
    },
    computedRutaImgWithQueryParams(imgPath: string) {
      return process.env.BACKEND_URL + 'news/img/' + imgPath + '?id=' + new Date().toString();
    },
    async getListadoNewsByPagination(init: number, quantity: number, filter: string | null) {
      try {
        this.loadingAxios = true;

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userLoginStore.remember_token;

        const paginationResponse = await axios({
          method: 'get',
          url: `/news/by_pagination/${init}/${quantity}${filter ? '?filter=' : ''}${filter}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          responseType: 'json',
        });

        this.loadingAxios = false;
        this.rowsNoticias = paginationResponse.data.news.map((row: any) => ({
          ...row,
          publish_date:
            row.publish_date == null
              ? ''
              : row.publish_date.replaceAll('T', ' ').replaceAll('.000Z', '').replaceAll('Z', ''),
          created_at: row.created_at
            .replaceAll('T', ' ')
            .replaceAll('.000Z', '')
            .replaceAll('Z', ''),
          news_content: row.news_content.map((news_content: any) => {
            return {
              id: news_content.id,
              position: news_content.position,
              position_anterior: news_content.position,
              tipo: news_content.tipo,
              tipo_anterior: news_content.tipo,
              contenido: news_content.contenido,
              contenido_anterior: news_content.contenido,
              descripcion: news_content.descripcion,
              descripcion_anterior: news_content.descripcion,
              file: null,
            };
          }),
        }));

        return paginationResponse.data.news_total as number;
      } catch (err: any) {
        this.loadingAxios = false;

        if (err.response.data.error != null) {
          err.response.data.error.forEach((element: any) => {
            this.$q.notify({
              type: 'negative',
              message: element,
              position: 'top',
            });
          });
          return 0;
        }

        this.$q.notify({
          type: 'negative',
          message: 'No se pudo consultar las Noticias, intente más tarde.',
          position: 'top',
        });

        return 0;
      }
    },
    cerrarRegistroNoticia() {
      this.dialogRegistrarNoticia = false;
      (this.$refs.newsTable as any).requestServerInteraction();
    },

    cerrarEditNoticia() {
      this.dialogEditNoticia = false;
      this.noticiasSelected = [];
      (this.$refs.newsTable as any).requestServerInteraction();
    },

    cerrarDeleteNoticia() {
      this.dialogDeleteNoticia = false;
      this.noticiasSelected = [];
      (this.$refs.newsTable as any).requestServerInteraction();
    },

    /* toggleSelected() {
      const slicedNoticias = this.rowsNoticias.slice(
        this.noticiasPagination.rowsPerPage * (this.noticiasPagination.page - 1),
        this.noticiasPagination.rowsPerPage * this.noticiasPagination.page,
      );

      this.noticiasSelected =
        this.noticiasSelected.length == slicedNoticias.length ? [] : slicedNoticias;
    }, */
  },

  computed: {
    fechaFormateada(fecha: any) {
      return date.formatDate(fecha, 'YYYY-MM-DD HH:mm');
    },
  },

  watch: {
    modelSelectSeccionNoticia: function (selectSeccionNoticia) {
      console.log(selectSeccionNoticia.id);
    },
  },
});
</script>

<style>
@media (max-width: 600px) {
  .q-table thead tr {
    display: flex;
    align-items: center;
    height: 64px;
    max-width: calc(100vw - 1rem);
    overflow-x: auto;
    overflow-y: hidden;
  }

  .q-table thead tr th:first-child {
    min-width: 60px;
  }
}
</style>
