<template>
<v-card>

<v-card-title>
    <span class="headline">Nuevo Simbolo</span>
</v-card-title>

<v-card-text>
    <form>

    <v-text-field
        v-validate="'required|max:20'"
        v-model="lelSymbol.name"
        :counter="20"
        :error-messages="errors.collect('name')"
        label="Name"
        data-vv-name="name"
        required
        ></v-text-field>

    <v-select
        v-validate="'required'"
        :items="types"
        v-model="lelSymbol.type"
        :error-messages="errors.collect('type')"
        label="Select"
        data-vv-name="type"
        required
        ></v-select>

    <v-textarea
        v-validate="'required'"
        v-model="lelSymbol.description"
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
    <v-btn @click="clear" color="blue darken-1" flat >Limpiar</v-btn>
    <v-btn @click="cancel" color="red darken-1" flat >Cancelar</v-btn>
</v-card-actions>

</v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import LelSymbolStore from "@/store/LelSymbol";
import LelSymbol from "@/model/LelSymbol";
import Const from "@/constants";
import router from "@/router";

@Component({
  name: "LelSymbolForm"
})
export default class LelSymbolDetail extends Vue {

  @Prop({ type: String, required: true }) projectId: string;

  lelSymbol: LelSymbol = new LelSymbol("", "", "", "", new Date(), new Date());
  types = [
    {
      value: Const.LEL_SYMBOL_TYPES.OBJECT,
      text: Const.LEL_SYMBOL_TYPES_READABLE.get(Const.LEL_SYMBOL_TYPES.OBJECT)
    },
    {
      value: Const.LEL_SYMBOL_TYPES.SUBJECT,
      text: Const.LEL_SYMBOL_TYPES_READABLE.get(Const.LEL_SYMBOL_TYPES.SUBJECT)
    },
    {
      value: Const.LEL_SYMBOL_TYPES.VERB,
      text: Const.LEL_SYMBOL_TYPES_READABLE.get(Const.LEL_SYMBOL_TYPES.VERB)
    },
    {
      value: Const.LEL_SYMBOL_TYPES.STATE,
      text: Const.LEL_SYMBOL_TYPES_READABLE.get(Const.LEL_SYMBOL_TYPES.STATE)
    }
  ];

  clear() {
    this.lelSymbol.name = "";
    this.lelSymbol.description = "";
    this.lelSymbol.type = "";
    this.$validator.reset();
  }

  @Emit()
  cancel() {
    this.clear()
  }

  async submit() {
    const validationPassed = await this.$validator.validateAll();
    if (validationPassed) {
      const lelSymbol = await LelSymbolStore.saveLelSymbol({lelSymbol: this.lelSymbol, projectId: this.projectId});
      this.$router.push({ name: `symbol-detail`, params: { id: lelSymbol.id } });
    }
  }
}
</script>



