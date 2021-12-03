import { h } from 'preact';

const DefaultTableRows = () => 
	new Array(10).fill('').map((_, index) => (
		<tr key={index} class="w-full odd:bg-gray-300 text-center dark:odd:bg-gray-900">
			<td class="p-2"><div class="w-full h-2 bg-gray-400 dark:bg-gray-600" /></td>
			<td class="p-2"><div class="w-full h-2 bg-gray-400 dark:bg-gray-600" /></td>
			<td class="p-2"><div class="w-full h-2 bg-gray-400 dark:bg-gray-600" /></td>
			<td class="p-2"><div class="w-full h-2 bg-gray-400 dark:bg-gray-600" /></td>
		</tr>
		)
	);

export default DefaultTableRows;