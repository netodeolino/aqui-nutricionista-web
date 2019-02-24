<template>
   <div
    class="form-group"
    :class="[
      {'input-group': hasIcon},
      {'has-danger': error},
      {'input-group-alternative': alternative},
      {'has-label': label || $slots.label},
      {'has-success': valid === true},
      {'has-danger': valid && error === false}]">
    <div v-if="addonLeftIcon || $slots.addonLeft" class="input-group-prepend">
      <span class="input-group-text">
        <slot name="addonLeft">
          <i :class="addonLeftIcon"></i>
        </slot>
      </span>
    </div>
    <v-select
      :value="value"
      v-on="listeners"
      v-bind="$attrs"
      class="form-control"
      :class="[{'is-invalid': valid === false}, {'is-invalid': valid === true}, {}, selectClasses]"
      aria-describedby="addon-right addon-left"
      :options="options"/>
    <span v-if="error || valid === true" class="input-group-text space-left"/>
    <div v-if="addonRightIcon || $slots.addonRight" class="input-group-append">
      <span class="input-group-text">
        <slot name="addonRight">
            <i :class="addonRightIcon"></i>
        </slot>
      </span>
    </div>
    <slot name="infoBlock"></slot>
    <slot name="helpBlock">
      <div class="text-warning invalid-feedback feedback-container" style="display: block;" :class="{'mt-1 mb-1': hasIcon}" v-if="description" >
        {{ description }}
      </div>
      <div class="text-danger invalid-feedback feedback-container" style="display: block;" :class="{'mt-1 mb-1': hasIcon}" v-if="error">
        {{ error }}
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "base-selector",
  props: {
    required: {
      type: Boolean,
      description: "Whether input is required (adds an asterix *)"
    },
    valid: {
      type: Boolean,
      description: "Whether is valid",
      default: undefined
    },
    alternative: {
      type: Boolean,
      description: "Whether input is of alternative layout"
    },
    label: {
      type: String,
      description: "Input label (text before input)"
    },
    error: {
      type: String,
      description: "Input error (below input)"
    },
    labelClasses: {
      type: String,
      description: "Input label css classes"
    },
    selectClasses: {
      type: String,
      description: "Input css classes"
    },
    value: {
      type: [String, Number],
      description: "Input value"
    },
    addonRightIcon: {
      type: String,
      description: "Addon right icon"
    },
    addonLeftIcon: {
      type: String,
      description: "Addont left icon"
    },
    description: {
      type: [String, Boolean]
    },
    options: {
      type: Array
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners
      };
    },
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots;
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      );
    }
  }
};
</script>
<style>
#app .selected-tag {
  color: #8898aa;
  padding-top: 20px;
}
.space-left {
  padding-left: 25px;
}
</style>
