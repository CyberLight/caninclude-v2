import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import get from 'lodash/get';
import CanIcon from '../../components/icons/can';
import CantIcon from '../../components/icons/cant';
import DoubtIcon from '../../components/icons/doubt';
import TagSettings from '../../components/tagsettings';

const CanIconType = 'can';
const CantIconType = 'cant';
const DoubtIconType = 'doubt';

const Result = ({ matches: { child, parent } = {} }) => {
	const [result, setResult] = useState();
	const [childSelectedParams, setChildSelectedParams] = useState([]);
	const [parentSelectedParams, setParentSelectedParams] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const childSelectParamHandler = (e) => {
		if (e.target.checked) {
			setChildSelectedParams([...childSelectedParams, `is:${e.target.name}`]);
		} else {
			setChildSelectedParams(childSelectedParams.filter((param) => param !== `is:${e.target.name}`));
		}
	};

	const parentSelectParamHandler = (e) => {
		if (e.target.checked) {
			setParentSelectedParams([...parentSelectedParams, `is:${e.target.name}`]);
		} else {
			setParentSelectedParams(parentSelectedParams.filter((param) => param !== `is:${e.target.name}`));
		}
	};

	useEffect(() => {
		const params = new URLSearchParams({ child, parent, childParams: childSelectedParams, parentParams: parentSelectedParams });
		fetch(`/api/caninclude?${params}`)
			.then((r) => r.json())
			.then((json) => setResult(json.result))
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	}, [child, parent, childSelectedParams, parentSelectedParams]);

	const childTag = get(result, 'child.tag', 'child');
	const childParams = get(result, 'child.params', []);
	const parentTag = get(result, 'parent.tag', `parent`);
	const parentParams = get(result, 'parent.params', []);
	const alternativeIconType = get(result, 'include.alternative.can');
	const iconType = alternativeIconType || get(result, 'include.can', 'can');
	const alternativeMessage = get(result, 'include.alternative.message', []);
	const includeParams = get(result, 'include.params', []).reduce((o, [key, props]) => ({[key]: props, ...o}), {});

	const mapLink = (line, selectParams) => {
		const params = selectParams[line.hashText];
		return params 
			? (<span class={`border whitespace-nowrap rounded-md pl-2 space-x-2 ${params.can ? 'border-green-700 dark:border-green-200' : 'border-red-700 dark:border-red-300'}`}>
				<a 
					href={line.href} 
					class="text-yellow-700 dark:text-yellow-500"
				>{line.text}</a>
					<span class="bg-black text-white px-2 font-thin rounded-tr-md rounded-br-md">{params.priority}</span>
				</span>)
			: (<a 
				href={line.href}
				class="text-yellow-700 dark:text-yellow-500">{line.text}</a>);
	}

	const mapBlock = (block, selectParams = {}) => {
		return block.map((line) => {
			if (typeof line !== 'string') {
				return mapLink(line, selectParams);
			}
			return line;
		})
	}

	return (
		<main class="block min-h-content">
			<h1 class="sr-only">Result of including a tag in a tag</h1>
			{alternativeMessage.length > 0 && 
				(<div class="w-full relative">
					<input type="checkbox" id="show_switcher" class="sr-only peer sm:hidden" />
					<div class="w-full h-16 text-sm p-2 bg-yellow-300 dark:bg-yellow-600 overflow-hidden peer-checked:h-full sm:h-full">{alternativeMessage.join(' ')}</div>
					<div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800 peer-checked:hidden sm:hidden" />
					<label htmlFor="show_switcher" class="absolute ml-auto mr-auto bottom-1 text-xs px-2 left-0 right-0 w-24 rounded-xl text-center select-none cursor-pointer text-white dark:text-current bg-black bg-opacity-40 peer-checked:hidden sm:hidden">read more...</label>
				</div>)
			}
			<div class="flex flex-col w-full h-full relative md:flex-row">
				<input id="child" class="sr-only peer" type="radio" name="tabs" value="child" checked />
				<input id="parent" class="sr-only" type="radio" name="tabs" value="parent" />
				<div class="flex justify-between gap-2 order-2 border-b text-gray-200 border-b-red-800 peer-checked-fch:bg-red-800 peer-not-checked-lch:bg-red-800 md:hidden">
					<label htmlFor="child" class="text-left p-4 rounded-tr-xl bg-gray-600 uppercase">{`<${childTag}/>`}</label>
					<label htmlFor="parent" class="text-right p-4 rounded-tl-xl bg-gray-600 uppercase">{`<${parentTag}/>`}</label>
				</div>
				<section class="flex-col p-2 m-4 bg-gray-200 dark:bg-gray-800 rounded-lg order-3 hidden peer-checked:flex space-y-1 h-auto relative md:flex md:flex-grow md:order-2 md:w-1/3 md:pt-16">
					<h2 class="capitalize top-0 left-0 md:bg-red-400 md:dark:bg-red-800 md:p-4 md:rounded-br-3xl md:rounded-tl-lg md:absolute">tag: <b class="uppercase">{`<${childTag}/>`}</b></h2>
					<section class="flex-grow border-l-4 border-blue-400 p-2 bg-gray-300 dark:bg-gray-700 relative">
						<h3 class="font-bold">Categories</h3>	
						{childParams.length > 0 && 
							<TagSettings 
								id="child_tag_settings" 
								lines={childParams} 
								clickHandler={childSelectParamHandler} 
								loading={loading}
							/>}
						<ul class="list-inside list-disc space-y-3 ml-7">
							{get(result, 'child.Categories', []).map((block, index) => (<li key={index}>{mapBlock(block, includeParams)}</li>))}
						</ul>
					</section>
					<section class="flex-grow border-l-4 p-2 border-yellow-500 dark:border-yellow-300">
						<h3 class="font-bold">Contexts in which this element can be used</h3>
						<ul class="list-inside list-disc space-y-3 ml-7">
							{get(result, 'child.ContextsInWhichThisElementCanBeUsed', []).map((block, index) => (<li key={index}>{mapBlock(block)}</li>))}
						</ul>
					</section>
					<section class="flex-grow border-l-4 border-blue-400 p-2">
						<h3 class="font-bold">Content model</h3>
						<ul class="list-inside list-disc space-y-3 ml-7">
							{get(result, 'child.ContentModel', []).map((block, index) => (<li key={index}>{mapBlock(block)}</li>))}
						</ul>
					</section>
					<section class="flex-grow border-t dark:border-gray-400">
						<table class="w-full mt-4">
							<thead>
								<tr class="text-left">
									<th class="px-2">Browser</th>
									<th class="px-2">Web HTML</th>
									<th class="px-2">Web API</th>
									<th class="px-2">CanIUse</th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(get(result, 'child.support', {})).map(([browser, params], index) => {
									const row = [browser].concat(Object.values(params));
									return <tr key={index} class="w-full odd:bg-gray-300 dark:odd:bg-gray-900">{
										row.map((col, index) => 
											<td key={index} class="px-2">{col}</td>
										)
									}</tr>
								})}
							</tbody>
						</table>
					</section>
				</section>
				<section class="flex flex-row w-full my-4 order-1 text-center justify-center items-center md:w-14 md:order-3 md:flex-grow md:h-auto md:justify-start md:flex-col">
					<h2 class="sr-only">Can include?</h2>
					<div class="flex flex-col h-16 w-20">
						{ iconType === CanIconType && <CanIcon /> }
						{ iconType === CantIconType && <CantIcon /> }
						{ iconType === DoubtIconType && <DoubtIcon /> }
					</div>
					{ iconType === CanIconType && <span class="flex text-green-600 dark:text-green-400">Yes, you can!</span> }
					{ iconType === CantIconType && <span class="flex text-red-600 dark:text-red-400">No, you can't!</span> }
					{ iconType === DoubtIconType && <span class="flex text-yellow-600 dark:text-yellow-400">Doubt?!</span> }
				</section>					
				<section class="flex flex-col p-2 m-4 bg-gray-200 dark:bg-gray-800 rounded-lg order-4 peer-checked:hidden h-auto space-y-1 relative md:peer-checked:flex md:flex md:order-4 md:flex-grow md:w-1/3 md:pt-16">
					<h2 class="capitalize top-0 left-0 md:bg-red-400 md:dark:bg-red-800 md:p-4 md:rounded-br-3xl md:rounded-tl-lg md:absolute">tag: <b class="uppercase">{`<${parentTag}/>`}</b></h2>
					<section class="flex-grow border-l-4 border-blue-400 p-2">
						<h3 class="font-bold">Categories</h3>	
						<ul class="list-inside list-disc space-y-3 ml-7">
							{get(result, 'parent.Categories', []).map((block, index) => (<li key={index}>{mapBlock(block)}</li>))}
						</ul>
					</section>
					<section class="flex-grow border-l-4 p-2 border-yellow-500 dark:border-yellow-300">
						<h3 class="font-bold">Contexts in which this element can be used</h3>
						<ul class="list-inside list-disc space-y-3 ml-7">
							{get(result, 'parent.ContextsInWhichThisElementCanBeUsed', []).map((block, index) => (<li key={index}>{mapBlock(block)}</li>))}
						</ul>
					</section>
					<section class="flex-grow border-l-4 border-blue-400 p-2 bg-gray-300 dark:bg-gray-700 relative">
						<h3 class="font-bold">Content model</h3>
						{parentParams.length > 0 && 
							<TagSettings 
								id="parent_tag_settings" 
								lines={parentParams} 
								clickHandler={parentSelectParamHandler} 
								loading={loading}
							/>}
						<ul class="list-inside list-disc space-y-3 ml-7">
							{get(result, 'parent.ContentModel', []).map((block, index) => (<li key={index}>{mapBlock(block, includeParams)}</li>))}
						</ul>
					</section>
					<section class="flex-grow border-t dark:border-gray-400">
						<table class="w-full mt-4">
							<thead>
								<tr class="text-left">
									<th class="px-2">Browser</th>
									<th class="px-2">Web HTML</th>
									<th class="px-2">Web API</th>
									<th class="px-2">CanIUse</th>
								</tr>
							</thead>
							<tbody>
								{Object.entries(get(result, 'parent.support', {})).map(([browser, params], index) => {
									const row = [browser].concat(Object.values(params));
									return <tr key={index} class="w-full odd:bg-gray-300 dark:odd:bg-gray-900">{
										row.map((col, index) => 
											<td key={index} class="px-2">{col}</td>
										)
									}</tr>
								})}
							</tbody>
						</table>
					</section>
				</section>
			</div>
		</main>
	);
}

export default Result;
