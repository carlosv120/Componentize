import React from "react";
import debug from 'sabio-debug'


import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as jobServices from "../../services/jobsServices"
import MappingJob from "./MapJob";

import Pagination from 'rc-pagination';
import toastr from "toastr";

import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";

import Swal from 'sweetalert2'

function Jobs() {

    const [pageData, setPageData] = useState({ arrayOfJobs: [], jobsComponents: [] });

    const [paginationData, setPaginationData] = useState({ pageIndex: 0, pageSize: 4, current: 1, total: 1 });

    const [showPagination, setShowPagination] = useState(true);

    const navigate = useNavigate();
    const _logger = debug.extend("Job");

    const _loggerViewMore = _logger.extend("ViewMore");

    useEffect(() => {

        if (pageData.query) {

            jobServices.searchJob(paginationData.pageIndex, paginationData.pageSize, pageData.query).then(onSearchJobsSuccess).catch(onSearchJobsError);

            return;
        }

        jobServices.getAllJobs(paginationData.pageIndex, paginationData.pageSize).then(onSuccessGetAllJobs).catch(onErrorGetAllJobs);


    }, [paginationData.pageIndex])


    const onSuccessGetAllJobs = (data) => {

        var arrayOfJobs = data.item.pagedItems;

        setPageData((previousState) => {

            const pageData = { ...previousState };

            pageData.arrayOfJobs = arrayOfJobs;
            pageData.jobsComponents = arrayOfJobs.map(mapJob)

            return pageData;
        })

        setPaginationData((prevState) => {

            const newState = { ...prevState };

            newState.total = data.item.totalCount;

            return newState

        })
    }

    const onErrorGetAllJobs = (error) => {

        console.log(error);
    }

    const mapJob = (aJobObject) => {

        _logger(aJobObject);

        return (
            <MappingJob
                job={aJobObject}
                key={"ListD-" + aJobObject.id}
                onJobViewMore={onClickViewMore}
                onJobEdit={onClickEditJob}
                onJobDelete={onDeleteRequested}
            >
            </MappingJob>
        )

    }

    const onChange = (page) => {


        setPaginationData((previousState) => {

            const newState = { ...previousState };

            newState.current = page;

            return newState
        });

        setPaginationData((previousState) => {

            const newState = { ...previousState };

            newState.pageIndex = page - 1;

            return newState;
        })
    }

    const onFormFieldChange = (event) => {

        setPageData((previousState) => {
            const newState = { ...previousState };

            newState.query = event.target.value;

            return newState

        })

    }


    const onClickSearchJob = (event) => {
        event.preventDefault();
        jobServices.searchJob(0, paginationData.pageSize, pageData.query).then(onSearchJobsSuccess).catch(onSearchJobsError);
    }

    const onSearchJobsSuccess = (data) => {

        var arrayOfJobsFound = data.item.pagedItems;

        toastr.success("Jobs found", "Successful");

        setPageData((previousState) => {

            const pageData = { ...previousState };

            pageData.arrayOfJobs = arrayOfJobsFound;
            pageData.jobsComponents = arrayOfJobsFound.map(mapJob);

            return pageData;
        })

        setPaginationData((prevState) => {

            const newState = { ...prevState };

            newState.total = data.item.totalCount;

            return newState

        })
        setShowPagination(() => true);
    }



    const onSearchJobsError = () => {

        toastr.error("No jobs found on record", "Error");

        setPageData((previousState) => {

            const newState = { ...previousState };

            newState.arrayOfJobs = [];
            newState.jobsComponents = [];
            newState.query = "";

            return newState
        })

        setShowPagination(() => false);
    }

    const onClickAddJob = (event) => {
        event.preventDefault();

        const targetPage = event.currentTarget.dataset.page;

        navigate(targetPage);


    }

    const onClickViewMore = (aJob) => {

        _loggerViewMore(aJob)

        const receivedSkills = aJob.skills;
        var skills = [];
        for (let i = 0; i < receivedSkills.length; i++) {
            const currentSkill = receivedSkills[i].skill;
            skills.push(currentSkill);
        }

        skills = skills.join(", ");

        Swal.fire({
            imageUrl: aJob.techCompany.primaryImage.url,
            html: `<h2 >${aJob.title}</h2>` +
                `<h3 >${aJob.techCompany.name}</h3>` +
                `<h4>${aJob.summary}</h4>` +
                `<h5>${aJob.description}</h5>` +
                `<h5>$ ${aJob.pay}</h5>` +
                `<h5>${skills}</h5>`,
        })
    }

    const onClickEditJob = (aJob) => {

        console.log("edit job", aJob)

        const targetPageEdit = `/jobs/${aJob.id}`;

        const stateToBeSent = { type: "JOB_EDIT", payload: aJob };

        navigate(targetPageEdit, { state: stateToBeSent })
    }

    const onDeleteRequested = (aJob) => {

        var aJobId = aJob.id

        console.log(aJobId, aJob);

        const handler = getDeleteSuccessHandler(aJobId);

        jobServices.deleteJob(aJobId).then(handler).catch(onErrorDeleteJob);

    }

    const getDeleteSuccessHandler = (idToBeDeleted) => {

        return () => {

            console.log("onDeleteSuccess", idToBeDeleted);

            setPageData(prevState => {

                var pageData = { ...prevState };
                pageData.arrayOfJobs = [...pageData.arrayOfJobs];


                const indexOfJob = pageData.arrayOfJobs.findIndex(job => {

                    var result = false;

                    if (job.id === idToBeDeleted) {
                        result = true;
                    }

                    return result;

                });

                if (indexOfJob >= 0) {
                    pageData.arrayOfJobs.splice(indexOfJob, 1);
                    pageData.jobsComponents = pageData.arrayOfJobs.map(mapJob);
                }


                return pageData;
            })

        }


    }

    const onErrorDeleteJob = (error) => {

        console.log(error);

    }

    return (
        <React.Fragment>
            <div className="container" style={{ backgroundColor: 'rgb(47 177 239)', padding: "12px" }}>
                <form>
                    <div className="row" style={{ marginTop: "15px" }}>

                        <div className="col-2 m-1">
                            <h4 className="text-center" >
                                Jobs
                            </h4>
                        </div>

                        <div className="col-4">
                            <button
                                type="submit"
                                className="btn btn-success"
                                id="searchJobs"
                                onClick={onClickAddJob}
                                data-page="/jobs/new">
                                Add Job
                            </button>
                        </div>

                        <div className="col-3">
                            <div className="form-group marginb-15">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pageIndex"
                                    name="pageIndex"
                                    placeholder="Insert query"
                                    onChange={onFormFieldChange}>
                                </input>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="form-group marginb-15">
                                <button
                                    type="submit"
                                    className="btn marg btn-secondary"
                                    id="submitButton"
                                    onClick={onClickSearchJob}>
                                    Search Jobs
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row justify-content-center">
                    {pageData.jobsComponents}
                </div>
                <div >
                    {showPagination && <Pagination

                        style={{ margin: "20px", marginLeft: "1025px" }}
                        onChange={onChange}
                        current={paginationData.current}
                        total={paginationData.total}
                        pageSize={paginationData.pageSize}
                        locale={locale}
                    />}
                </div>

            </div>

        </React.Fragment >
    )
}

export default Jobs