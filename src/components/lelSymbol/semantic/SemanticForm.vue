<template>
  <v-card>
    <v-card-title>
      <span class="headline">Agregar {{ semanticType }}</span>
    </v-card-title>

    <v-card-text>
      <form>
        <v-select
          v-validate="'required'"
          :items="types"
          v-model="semantic.type"
          :error-messages="errors.collect('type')"
          label="Select"
          data-vv-name="type"
          required
        ></v-select>

        <v-textarea
          v-validate="'required'"
          v-model="semantic.description"
          :error-messages="errors.collect('description')"
          label="Descripcion"
          data-vv-name="description"
          required
          auto-grow
          rows="3"
        ></v-textarea>
      </form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="submit" color="blue darken-1" flat>Guardar</v-btn>
      <v-btn @click="clear" color="blue darken-1" flat>Limpiar</v-btn>
      <v-btn @click="cancel" color="red darken-1" flat>Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import SemanticStore from "@/store/Semantic";
import Const from "@/constants";
import router from "@/router";
import Semantic from "@/model/Semantic";

@Component({
  name: "SemanticForm"
})
export default class SemanticForm extends Vue {
  @Prop({ type: String, required: true }) lelSymbolId: string;
  semantic: Semantic = new Semantic("", "", "", new Date(), new Date());
  types = [
    {
      value: Const.SEMANTIC_TYPE.NOTION,
      text: Const.READABLE_SEMANTIC_TYPE.get(Const.SEMANTIC_TYPE.NOTION)
    },
    {
      value: Const.SEMANTIC_TYPE.BEHAVIOURAL_RESPONSE,
      text: Const.READABLE_SEMANTIC_TYPE.get(
        Const.SEMANTIC_TYPE.BEHAVIOURAL_RESPONSE
      )
    }
  ];

  get semanticType() {
    return Const.READABLE_SEMANTIC_TYPE.get(this.semantic.type) || "";
  }

  clear() {
    this.semantic.description = "";
    this.semantic.type = "";
    this.$validator.reset();
  }

  @Emit()
  cancel() {
    this.clear();
  }

  async submit() {
    const validationPassed = await this.$validator.validateAll();
    if (validationPassed) {
      const semantic = await SemanticStore.saveSemantic({
        semantic: this.semantic,
        lelSymbolId: this.lelSymbolId
      });
      this.clear();
      this.$emit("cancel");
    }
  }
}
</script>



