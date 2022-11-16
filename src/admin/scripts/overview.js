
$(document).ready(async function() {
	console.debug("Loading Overview...");

	//Fetch packagebuildlist	
	const packagebuildlist = await branch_g_get_packagebuildlist();
	if (packagebuildlist == null){
		return;
	}

	//Fetch packagelist
	const packagelist = await branch_g_get_packagelist();
	if (packagelist == null){
		return;
	}

	//Fetch joblist
	const joblist = await branch_g_get_joblist();
	if (joblist == null){
		return;
	}

	//Fetch clientlist
	const clientlist = await branch_g_get_clientlist();
	if (clientlist == null){
		return;
	}

	packagesBuilt = packagelist.length;
	packagesNBuilt = packagebuildlist.length - packagesBuilt;
	jobsWaiting = joblist.queued_jobs.length;
	jobsRunning = joblist.running_jobs.length;
	jobsCompleted = joblist.completed_jobs.length;

	const chart_built_html = $("#chart_built");
	const chart_built = new Chart(chart_built_html, {
		type: 'doughnut',
		data: {
			datasets: [{
				label: 'Packages',
				data: [packagesBuilt, packagesNBuilt],
				backgroundColor: [
					'rgba(18, 100, 18, 0.9)',
					'rgba(20, 20, 20, 0.9)'
				],
				borderWidth: 1
			}],
			labels: ['Built', 'Not built']
		},
		options: {
			plugins: {
				legend: {
					display: true,
					position: "bottom",
				}
			}
		}
	});

	const chart_jobs_html = $("#chart_jobs");
	const chart_jobs = new Chart(chart_jobs_html, {
		type: 'doughnut',
		data: {
			datasets: [{
				label: 'Jobs',
				data: [jobsWaiting, jobsRunning, jobsCompleted],
				backgroundColor: [
					'rgba(20, 20, 20, 0.9)',
					'rgba(85, 255, 0, 0.9)',
					'rgba(18, 100, 18, 0.9)'
				],
				borderWidth: 1
			}],
			labels: ['Waiting', 'Running', 'Completed']
		},
		options: {
			plugins: {
				legend: {
					display: true,
					position: "bottom",
				}
			}
		}
	});


	$("#div_overview_section1").empty();
	$('<h2>' + packagesBuilt + ' Packages built</h2>').appendTo("#div_overview_section1");
	$('<h2>' + packagesNBuilt + ' Packages not built</h2>').appendTo("#div_overview_section1");

	$("#div_overview_section2").empty();
	$('<h2>' + clientlist.controllers.length + ' Controllers connected</h2>').appendTo("#div_overview_section2");
	$('<h2>' + clientlist.buildbots.length + ' Buildbots connected</h2>').appendTo("#div_overview_section2");
});
