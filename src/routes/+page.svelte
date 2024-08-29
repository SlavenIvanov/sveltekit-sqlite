<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
</script>

<div class="flex flex-col gap-4 items-center justify-center w-full min-h-screen">
	<h1 class="text-3xl font-bold">SQLite test</h1>
	{#await data.dbTest}
		<div>Testing</div>
	{:then result}
		{#each Object.entries(result) as [k, v]}
			<div>{k} : <b>{v.toLocaleString()}</b></div>
		{/each}
	{/await}
</div>
