<script lang="ts">
	// npm run dev -- --open
	// npm run build --base
	import { Button, Grid, Row, Column, Slider, Toggle, Tile } from 'carbon-components-svelte';

	import { db } from '../firebase';

	function setVals() {
		const ref = db.ref('something');

		const usersRef = ref.child('users');
		usersRef.set({
			alanisawesome: {
				date_of_birth: 'June 23, 1912',
				full_name: 'Alan Turing'
			},
			gracehop: {
				date_of_birth: 'December 9, 1906',
				full_name: 'Grace Hopper'
			}
		});
	}

	interface sensor_val {
		humid: number;
		temp: number;
		utc: string;
	}

	let reading: sensor_val;
	let fetched_temp: boolean = false;

	let curr_humid: number = 0.0;
	let curr_temp: number = 0.0;
	let curr_utc: string = "No reported date.";

	function getVals() {
		const ref = db.ref('0000/sensor_vals');

		ref.on(
			'value',
			(snapshot) => {
				reading = snapshot.val();
				curr_humid = reading.humid;
				curr_temp = reading.temp;
				curr_utc = reading.utc;
				console.log(reading);
			},
			(errorObject) => {
				console.log('The read failed: ' + errorObject.name);
			}
		);

		fetched_temp = true;
	}
</script>

<br />
<Grid>
	<Row><Column><h2>Haven Temperature and Humidity</h2></Column></Row>
	
	<Row padding>
		<Column lg={6}
			><Slider
				labelText="Send Text When Below (°C)"
				min={-50}
				max={50}
				maxLabel="50 °C"
				value={100}
			/></Column
		>
		<Column><Toggle labelText="Enable Notifications" /></Column>
	</Row>

	<br />
	<Button on:click={getVals}>Get Sensor Values</Button>
	{#if fetched_temp}
		<br />
		<br />
		<p>Temperature: {curr_temp} (Celcius)</p>
		<p>Humdity: {curr_humid} (%)</p>
		<br />
		<Tile>Last Reported on {curr_utc} (UTC)</Tile>
	{/if}
	
	<br />
</Grid>
