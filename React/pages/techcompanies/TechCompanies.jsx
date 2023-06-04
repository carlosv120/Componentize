import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as techCompaniesServices from "../../services/techCompaniesServices"
import MappingCompany from "./MapCompany";

import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";

import toastr from "toastr";
import Swal from 'sweetalert2'

function TechCompanies() {

    const [pageData, setPageData] = useState({ arrayOfCompanies: [], companiesComponents: [] });

    const [paginationData, setPaginationData] = useState({ pageIndex: 0, pageSize: 4, current: 1, total: 1 });

    const [showPagination, setShowPagination] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {

        if (pageData.query) {

            techCompaniesServices.searchCompanies(paginationData.pageIndex, paginationData.pageSize, pageData.query).then(onSearchCompaniesSuccess).catch(onSearchCompaniesError);

            return;
        }

        techCompaniesServices.getCompanies(paginationData.pageIndex, paginationData.pageSize).then(onSuccessGetAllCompanies).catch(onErrorGetAllCompanies);

    }, [paginationData.pageIndex])

    const onSuccessGetAllCompanies = (data) => {

        var arrayOfCompanies = data.item.pagedItems;

        setPageData((previousState) => {

            const pageData = { ...previousState };

            pageData.arrayOfCompanies = arrayOfCompanies;

            pageData.companiesComponents = arrayOfCompanies.map(mapCompany)

            return pageData;
        })

        setPaginationData((prevState) => {

            const newState = { ...prevState };

            newState.total = data.item.totalCount;

            return newState

        })
    };

    const onErrorGetAllCompanies = (error) => {

        console.log(error);
    }

    const mapCompany = (aCompanyObject) => {

        return (
            <MappingCompany
                company={aCompanyObject}
                key={"ListE-" + aCompanyObject.id}
                onCompanyViewMore={onClickViewMore}
                onCompanyEdit={onClickEditCompany}
            //onJobDelete={onDeleteRequested}
            >
            </MappingCompany>
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

    const onClickSearchCompany = (event) => {
        event.preventDefault();
        techCompaniesServices.searchCompanies(0, paginationData.pageSize, pageData.query).then(onSearchCompaniesSuccess).catch(onSearchCompaniesError);
    }


    const onSearchCompaniesSuccess = (data) => {

        var arrayOfCompaniesFound = data.item.pagedItems;

        toastr.success("Tech Companies found", "Successful");

        setPageData((previousState) => {

            const pageData = { ...previousState };

            pageData.arrayOfCompanies = arrayOfCompaniesFound;

            pageData.companiesComponents = arrayOfCompaniesFound.map(mapCompany);

            return pageData;
        })

        setPaginationData((prevState) => {

            const newState = { ...prevState };

            newState.total = data.item.totalCount;

            return newState

        })
        setShowPagination(() => true);
    }

    const onSearchCompaniesError = () => {

        toastr.error("No friends found on record", "Error");

        setPageData((previousState) => {

            const newState = { ...previousState };

            newState.arrayOfJobs = [];
            newState.jobsComponents = [];
            newState.query = "";

            return newState
        })

        setShowPagination(() => false);
    }

    const onClickAddTechCompany = (event) => {

        event.preventDefault();

        const targetPage = event.currentTarget.dataset.page;

        navigate(targetPage);

    }

    const onClickEditCompany = (aCompany) => {

        const targetPageEdit = `/companies/${aCompany.id}`;

        const stateToBeSent = { type: "COMPANY_EDIT", payload: aCompany };

        navigate(targetPageEdit, { state: stateToBeSent })
    }

    const onClickViewMore = (aCompany) => {

        const receivedTags = aCompany.tags;
        var tags = [];
        for (let i = 0; i < receivedTags.length; i++) {
            const currentTag = receivedTags[i].tag;
            tags.push(currentTag);
        }

        tags = tags.join(", ");

        Swal.fire({
            imageUrl: aCompany.primaryImage.url,
            title: aCompany.name,
            html: `<h3>${aCompany.headline}</h3>` +
                `<h4>${aCompany.profile}</h4>` +
                `<h5>${aCompany.summary}</h5>` +
                `<h6>${aCompany.contactInformation}</h6>` +
                `<p>${tags}</p>`
        })


    }



    return (
        <React.Fragment>
            <div className="container" style={{ backgroundColor: 'rgb(239 220 47)', padding: "12px" }}>
                <form>
                    <div className="row" style={{ marginTop: "15px" }}>

                        <div className="col-3 m-1">
                            <h4 className="text-center" >
                                Tech Companies
                            </h4>
                        </div>

                        <div className="col-3">
                            <button
                                type="submit"
                                className="btn btn-success"
                                id="searchJobs"
                                onClick={onClickAddTechCompany}
                                data-page="/companies/new"
                            >
                                Add Tech Company
                            </button>
                        </div>

                        <div className="col-3">
                            <div className="form-group marginb-15" >
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pageIndex"
                                    name="pageIndex"
                                    placeholder="Insert query"
                                    onChange={onFormFieldChange}
                                >
                                </input>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="form-group marginb-15">
                                <button
                                    type="submit"
                                    className="btn marg btn-secondary"
                                    id="submitButton"
                                    onClick={onClickSearchCompany}
                                >
                                    Search Tech Company
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="row justify-content-center">
                    {pageData.companiesComponents}
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
        </React.Fragment>
    )
}

export default TechCompanies