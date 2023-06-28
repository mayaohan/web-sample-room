<template>
	<div class="app-wrapper">
		<!-- <sidebar class="sidebar-container"></sidebar> -->
		<div class="main-container">
			<navbar></navbar>
			<tags-view @setAnimate="animate"></tags-view>
			<app-main v-if="sidebar"></app-main>
      <app-main-no-animate v-else></app-main-no-animate>
		</div>
	</div>
</template>

<script setup>
// import { Navbar, Sidebar, AppMain, TagsView } from './components'
import { AppMain, TagsView,Navbar,AppMainNoAnimate } from './components'
import {ref} from 'vue'
const sidebar = ref()

const animate = (param)=>{
  console.log(param.value)
  sidebar.value = param.value
}
</script>

<style lang="scss" scoped>
	.app-wrapper {
	  .clearfix{
		  &::after {
			content: "";
			display: table;
			clear: both;
		}
	  }
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
</style>
