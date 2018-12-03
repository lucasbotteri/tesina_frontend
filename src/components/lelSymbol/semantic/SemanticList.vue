<template>
  <v-layout row>

    <v-flex xs12 sm10 offset-sm1>
      <v-toolbar
      color="primary"
      class="mt-3"
      dark
      >
        <v-toolbar-title>{{readableType}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card >
          <v-list two-line>
        </v-list>
        

      </v-card>
      <v-dialog
        width="500"
        persistent
        v-model="showModalForm"
      >

      <v-btn
      color="secondary"
      slot="activator"
      dark
      fixed
      bottom
      right
      fab
    >
      <v-icon>add</v-icon>
    </v-btn>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SemanticStore from "@/store/Semantic";
import Semantic from "@/model/Semantic";
import Const from "@/constants";

@Component({
  name: "SematicList",
  components: {}
})
export default class SematicListVue extends Vue {

  @Prop({ type: String, required: true })
  lelSymbolId: string;

  showModalForm: Boolean = false

  closeModal(){
    this.showModalForm = false
  }

  readableType(){
    return 'Const.READABLE_SEMANTIC_TYPE.get(this.type)'
  }

  mounted() {
    console.log(this.lelSymbolId)
    SemanticStore.fetchNotions(this.lelSymbolId)
    SemanticStore.fetchBehaviouralResponses(this.lelSymbolId)
  }

}
</script>



