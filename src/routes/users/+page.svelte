<!-- src/routes/users/+page.svelte -->
<script>
	export let data;

	var { users } = data;
</script>

<h1>Users List</h1>

{#if users.length > 0}
	<ul>
		{#each users as user}
			<li>{user.username} - {user.email}</li>
		{/each}
	</ul>
{:else}
	<p>No users found.</p>
{/if}
