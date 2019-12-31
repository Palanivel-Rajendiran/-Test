import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AppConstants } from  '../../../../@core/utils/constants';
import { AppDataService, ApiService, LocalStorageService } from  '../../../../@core/utils';
import _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})

export class ProjectFormComponent implements OnInit, OnChanges, AfterViewInit {

  manageProjectForm: FormGroup;
  empRoleMapForm: FormGroup;
  projectScopeForm: FormGroup;
  mapProductsForm: FormGroup;
  mapAttributesForm: FormGroup;
  viewType: string = 'Create';
  Project_Name: string = '';
  Project_Code: string = '';

  // List Options
  businessVerticalList: any;
  sdlcMethodList: any;
  projectLevelList: any;
  projectsList: any;
  projectStatusList: any;
  projectTypeList: any;
  defectManagementToolList: any;
  autoExecutionToolList: any;
  projectStatusIndicatorList: any;
  employeesList: any;
  rolesList: any;
  empRoleNResponsabilityList: any;
  requirementsNProductsSettings: any;
  requirementsNProductsData: any[];
  mapProductSettings: any;
  mapProductData: any[];
  mapAttributeSettings: any;
  mapAttributeData: any[];
  stepper: any;
  
  constructor(private fb: FormBuilder, private AppDataService: AppDataService,
    private ApiService: ApiService, private localStorageService: LocalStorageService, private router: Router) {
    this.businessVerticalList = this.AppDataService.getDataByServiceParams('BusinessVertical');
    this.sdlcMethodList = this.AppDataService.getDataByServiceParams('SDLC-MTHD-CD');
    this.projectLevelList = [];
    this.projectsList = this.AppDataService.getDataByServiceParams('Projects');
    this.projectStatusList = this.AppDataService.getDataByServiceParams('PROJ-STAT-CD');
    this.projectTypeList = this.AppDataService.getDataByServiceParams('PROJ-TYP-CD');
    this.defectManagementToolList = this.AppDataService.getDataByServiceParams('DEFECTMGMT-TOOL-CD');
    this.autoExecutionToolList = this.AppDataService.getDataByServiceParams('AUTOEXEC-TSTTOOL-CD');
    this.projectStatusIndicatorList = this.AppDataService.getDataByServiceParams('PROJ-STAT-IND');
    this.employeesList = this.AppDataService.getDataByServiceParams('Employees');
    this.rolesList = _.filter(this.AppDataService.getDataByServiceParams('Roles'), {IsActive: 'A'});
  }

  ngOnInit() {
    this.viewType = this.localStorageService.getValue('Project_View_By') ? this.localStorageService.getValue('Project_View_By') : 'Create';
    this.initManageProject();
    this.initEmployeeRoleMap();
    this.initRequirementsNProducts();
    this.initMapProducts();
    this.initMapAttributes();
  }

  ngAfterViewInit() {
    
  }

  ngOnChanges() {
  }

  // Populate the project info by project id
  private initPopulateProjectInfo() {
    const params = {
      Project_Code: this.localStorageService.getValue('Project_Code')
    };
    this.ApiService.populateProject(params).subscribe(
      (resp: any) => {
        if (resp.data && resp.data.length) {
          this.manageProjectForm.patchValue(resp.data[0]);
          this.initProjectLevelListBySDLSMethod(resp.data[0].Sdlc_Method_Code);
          this.initParentProjectChange(resp.data[0].ParentProject_Code);
        }
      },
      error => console.log(error)
    );
  }

  // Init Manage Project Form Objs
  private initManageProject() {
    this.manageProjectForm = this.fb.group({
      Project_Name: [{ value: '', disabled: this.viewType === 'view' }, Validators.compose([Validators.required, Validators.pattern(AppConstants.NoWhiteSpaceReg)])],
      Bv_Code: [{ value: '', disabled: this.viewType === 'view' }, Validators.required],
      Sdlc_Method_Code: [{ value: 'HYBRID', disabled: this.viewType === 'view' }, Validators.required],
      Project_Level_code: [{ value: '', disabled: this.viewType === 'view' }, Validators.required],
      ParentProject_Code: [{ value: '', disabled: this.viewType === 'view' }],
      ParentProject_Status: [{ value: '', disabled: true }],
      MainProject_Name: [{ value: '', disabled: this.viewType === 'view' }],
      MainProject_Code: [{ value: '', disabled: this.viewType === 'view' }],
      Project_Description: [{ value: '', disabled: this.viewType === 'view' }],
      Project_Status: [{ value: '200', disabled: this.viewType === 'view' }, Validators.required],
      Project_Type_Code: [{ value: 'PROD', disabled: this.viewType === 'view' }, Validators.required],
      Defect_Mgmt_Tool_Code: [{ value: '', disabled: this.viewType === 'view' }, Validators.required],
      AutoExec_Test_Tool: [{ value: 'MANUAL', disabled: this.viewType === 'view' }, Validators.required],
      Project_Status_Indicator: [{ value: 'G', disabled: this.viewType === 'view' }, Validators.required],
      Project_Plan_Start_Date: [{ value: '', disabled: this.viewType === 'view' }, Validators.required],
      Project_Plan_End_Date: [{ value: '', disabled: this.viewType === 'view' }, Validators.required],
      Project_Actl_Start_Date: [{ value: '', disabled: this.viewType === 'view' }],
      Project_Actl_End_Date: [{ value: '', disabled: this.viewType === 'view' }],
      ReviewedBy: [{ value: '', disabled: this.viewType === 'view' }],
    });
    if (this.localStorageService.getValue('Project_Code')) {
      this.initPopulateProjectInfo();
    }
  }

  // Init Manage Project Form Objs
  private initEmployeeRoleMap() {
    this.empRoleMapForm = this.fb.group({
      Project_Name: [{ value: this.localStorageService.getValue('Project_Name'), disabled: true }],
      Project_Code: [{ value: this.localStorageService.getValue('Project_Code'), disabled: true }],
      ProjectEmpRoleList: this.fb.array([])
    });
  }

  // Init Manage Project Form Objs
  private initRequirementsNProducts() {
    this.projectScopeForm = this.fb.group({
      Project_Name: [{ value: this.localStorageService.getValue('Project_Name'), disabled: true }],
      Project_Code: [{ value: this.localStorageService.getValue('Project_Code'), disabled: true }],
    });
    this.requirementsNProductsSettings = {
      title: 'Assign Requirement and Products To This Project',
      editable: false,
      hideSubHeader: true,
      isAddNew: false,
      actions: {
        add: false,
        edit: false,
        delete: false,
        class: 'custom-column',
        custom: [
          { name: 'onEdit', title: '<i class="nb-edit" title="Edit project"></i>' },
          { name: 'onDelete', title: '<i class="nb-trash" title="Delete project"></i>' }
        ],
        position: 'right'
      },
      columns: {
        DetRequirement_Code: {
          title: 'Requirement Code',
          type: 'string',
        },
        DetRequirement_Name: {
          title: 'Requirement Name',
          type: 'string',
        },
        Priority_Name: {
          title: 'Requirement Priority',
          type: 'string',
        },
        DetRequirement_Status_Code: {
          title: 'Requirement Status',
          type: 'string',
        },
        Risk_Prob: {
          title: 'Risk Probability',
          type: 'string',
        },
        Risk_Impact: {
          title: 'Risk Impact',
          type: 'string',
        },
        Assigned_To_Project: {
          title: 'Assigned to Project',
          type: 'string',
        }
      }
    };
  }

  private initRequirementsNProductsList() {
    let params;
    let APIMethod;
    if (this.viewType === 'Create') {
      params = {
        Sdlc_Method_Code: this.localStorageService.getValue('Sdlc_Method_Code')
      };
      APIMethod = this.ApiService.initialAssignReqNProducts(params);
    } else {
      params = {
        Project_Code: this.localStorageService.getValue('Project_Code'),
        Sdlc_Method_Code: this.localStorageService.getValue('Sdlc_Method_Code')
      };
      APIMethod = this.ApiService.populateAssignReqNProductsToEdit(params);
    }
    APIMethod.subscribe(
      (resp: any) => {
        this.requirementsNProductsData = resp.data;
      },
      error => console.log(error)
    );
  }

  // Init Manage Project Form Objs
  private initMapProducts() {
    this.mapProductsForm = this.fb.group({
      Project_Name: [{ value: this.localStorageService.getValue('Project_Name'), disabled: true }],
      Project_Code: [{ value: this.localStorageService.getValue('Project_Code'), disabled: true }],
    });
    this.mapProductSettings = {
      title: 'List Of Project',
      editable: false,
      hideSubHeader: true,
      isAddNew: {
        title: 'Add Project',
        routerLink: "/pages/project/projects/form-view"
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        class: 'custom-column',
        custom: [
          { name: 'onView', title: '<i class="ion-eye" title="View project"></i>' },
          { name: 'onEdit', title: '<i class="nb-edit" title="Edit project"></i>' },
          { name: 'onDelete', title: '<i class="nb-trash" title="Delete project"></i>' }
        ],
        position: 'right'
      },
      columns: {
        Project_Code: {
          title: 'Project Code',
          type: 'number',
        },
        Project_Name: {
          title: 'Project Name',
          type: 'string',
        },
        Project_Status: {
          title: 'Project Status',
          type: 'string',
        },
        Project_Description: {
          title: 'Project Description',
          type: 'string',
        }
      }
    };
  }

  private initMapProductsList() {
    this.ApiService.listOfProjects().subscribe(
      (resp: any) => {
        this.mapProductData = resp.data;
      },
      error => console.log(error)
    );
  }

  // Init Manage Project Form Objs
  private initMapAttributes() {
    this.mapAttributesForm = this.fb.group({
      Project_Name: [{ value: this.localStorageService.getValue('Project_Name'), disabled: true }],
      Project_Code: [{ value: this.localStorageService.getValue('Project_Code'), disabled: true }],
    });
    this.mapAttributeSettings = {
      title: 'List Of Project',
      editable: false,
      hideSubHeader: true,
      isAddNew: {
        title: 'Add Project',
        routerLink: "/pages/project/projects/form-view"
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        class: 'custom-column',
        custom: [
          { name: 'onView', title: '<i class="ion-eye" title="View project"></i>' },
          { name: 'onEdit', title: '<i class="nb-edit" title="Edit project"></i>' },
          { name: 'onDelete', title: '<i class="nb-trash" title="Delete project"></i>' }
        ],
        position: 'right'
      },
      columns: {
        Project_Code: {
          title: 'Project Code',
          type: 'number',
        },
        Project_Name: {
          title: 'Project Name',
          type: 'string',
        },
        Project_Status: {
          title: 'Project Status',
          type: 'string',
        },
        Project_Description: {
          title: 'Project Description',
          type: 'string',
        }
      }
    };
    this.ApiService.listOfProjects().subscribe(
      (resp: any) => {
        this.mapAttributeData = resp.data;
      },
      error => console.log(error)
    );
  }

  getEmployeeDetailsById(empCode: string) {
    return _.find(this.employeesList, ['emp_Code', empCode]);
  }

  getRoleDetailsById(rCode: string) {
    return _.find(this.rolesList, ['Role_Code', rCode]);
  }

  private employeesRoleMap() {
    let form = this.fb.group({
      Role_Code: [{ value: '', disabled: this.viewType === 'view' }, Validators.compose([Validators.required])],
      Employee_Code: [{ value: '', disabled: this.viewType === 'view' }, Validators.compose([Validators.required])],
      BV_Code: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
      BV_Name: [{ value: "", disabled: true }, Validators.compose([Validators.required])],
      Responsibilities: [{ value: '', disabled: true }],
      Signoff_Ind: [{ value: '', disable: this.viewType === 'view' }],
      Signoff_Ind_Original: [{ value: '' }, Validators.compose([Validators.required])],
      Is_Associated: [{ value: false, disable: this.viewType === 'view' }]
    });
    form.get('Employee_Code').valueChanges.subscribe(value => {
      const data = this.getEmployeeDetailsById(value);
      form.get('BV_Code').setValue(data.bv_Code);
      form.get('BV_Name').setValue(data.bv_Name);
    });
    form.get('Role_Code').valueChanges.subscribe(value => {
      const data = this.getRoleDetailsById(value);
      form.get('Responsibilities').setValue(data.Responsibilities);
    });
    if (this.viewType === 'view') {
      form.disable();
    }
    return form;
  }

  addEmployeeNRoles() {
    const control = <FormArray>this.empRoleMapForm.controls['ProjectEmpRoleList'];
    const addCtrl = this.employeesRoleMap();
    control.push(addCtrl);
  }

  removeEmployeeNRoles(recordIndex: number, formControl: any) {
    const control = <FormArray>this.empRoleMapForm.controls['ProjectEmpRoleList'];
    let formControlRawValue = formControl.getRawValue();
    if (formControlRawValue.Is_Associated) {
      if (confirm("Are you Sure?")) {
        const params = {
          Employee_Code: formControlRawValue.Employee_Code,
          Role_Code: formControlRawValue.Role_Code,
          BV_Code: formControlRawValue.BV_Code
        };
        this.ApiService.deAssociateEmployeeRoleFromProject(params).subscribe(
          (resp: any) => {
            control.removeAt(recordIndex);
          },
          error => console.log(error)
        )
      }
    } else {
      control.removeAt(recordIndex);
    }
  }

  private initPopulateEmployeesListByProject() {
    let params;
    let control: any;
    let ctrl: any;
    let APIMethod;
    if (this.viewType === 'Create') {
      params = {
        User_id: null
      };
      APIMethod = this.ApiService.initialEmployeesByProject(params);
    } else {
      params = {
        Project_Code: this.localStorageService.getValue('Project_Code'),
        IsActive: 'A'
      };
      APIMethod = this.ApiService.rolesNResponsibilitiesListByProject(params);
    }
    APIMethod.subscribe(
      (resp: any) => {
        resp.data = _.map(resp.data, (data:any) => {
          data.Is_Associated = true;
          return data;
        })
        this.empRoleMapForm.controls['ProjectEmpRoleList'] = this.fb.array([]);
        _.each(resp.data, (data: any) => {
          control = <FormArray>this.empRoleMapForm.controls['ProjectEmpRoleList'];
          ctrl = this.employeesRoleMap();
          ctrl.patchValue(data);
          control.push(ctrl);
        });
      },
      error => console.log(error)
    )
  }

  disableListOptions(optionsValue: string) {
    return optionsValue === "400" || optionsValue === "500" ? true : false;
  }

  initProjectLevelListBySDLSMethod(value: string) {
    const params = {
      KeyValue_Type_Cd: value,
      KeyValue_Lang_Cd: 'E'
    };
    this.ApiService.keyValueMap(params).subscribe(
      (resp: any) => {
        this.projectLevelList = resp.data;
        this.manageProjectForm.patchValue({
          Project_Level_code: resp.data.length ? resp.data[0].KeyValue_Val_Cd : ''
        });
      },
      error => console.log(error)
    )
  }

  initParentProjectChange(projectCode: string) {
    const listOfProjectStatusCodeMap = this.AppDataService.getDataByServiceParams('PROJ-STAT-CD');
    const selectedProjectStatusCode = _.filter(this.projectsList, (p: any) => {
      return p.Project_Code === projectCode;
    })[0];
    const projectStatusValue = _.filter(listOfProjectStatusCodeMap, (s: any) => {
      return s.KeyValue_Val_Cd === selectedProjectStatusCode.Project_Status;
    })[0];
    this.manageProjectForm.patchValue({
      ParentProject_Status: projectStatusValue.KeyValue_Desc
    });
  }

  resetProjectForm() {
    if (this.viewType == 'edit')
      this.manageProjectForm.patchValue({});  
    else {
      this.manageProjectForm.reset();
    }
  }

  preProcessPostData(data: any) {
    //Date Format Coversion
    data.Project_Plan_Start_Date = data.Project_Plan_Start_Date.format('YYYY-MM-DD');
    data.Project_Plan_End_Date = data.Project_Plan_End_Date.format('YYYY-MM-DD');
    data.Project_Actl_Start_Date = data.Project_Actl_Start_Date ? data.Project_Actl_Start_Date.format('YYYY-MM-DD') : "NaN-NaN-NaN";
    data.Project_Actl_End_Date = data.Project_Actl_End_Date ? data.Project_Actl_End_Date.format('YYYY-MM-DD') : "NaN-NaN-NaN";
    return data;
  }
  initSaveOrUpdate(data: any, stepper: MatStepper) {
    // Check Form Validation and move forward
    if (this.manageProjectForm.invalid) {
      return;
    }
    data = this.preProcessPostData(data);
    data.ReviewedBy = data.ReviewedBy.toString();
    this.ApiService.saveOrUpdateProject(data).subscribe(
      (resp: any) => {
        this.localStorageService.setValues({
          Project_Name: data.Project_Name,
          Sdlc_Method_Code: data.Sdlc_Method_Code,
          Project_Code: resp.data
        });
        stepper.next();
        this.initPopulateEmployeesListByProject();
      },
      error => console.log(error)
    );
  }

  onEmployeeRoleMapSubmit(data: any, stepper: MatStepper) {
    // Check Form Validation and move forward
    if (this.empRoleMapForm.invalid) {
      return;
    }
    let proEmpRoleList = _.map(data.controls.ProjectEmpRoleList.getRawValue(), (record: any) => {
      record.Signoff_Ind = !record.Signoff_Ind ? 'N' : 'Y';
      record.Project_Code = data.controls.Project_Code.value;
      return _.pick(record, ["Role_Code", "Employee_Code", "BV_Code", "BV_Name", "Responsibilities", "Signoff_Ind", "Project_Code"]);
    });
    this.ApiService.saveOrUpdateEmpRoleMapByProject(proEmpRoleList).subscribe(
      (resp: any) => {
        stepper.next();
        this.initRequirementsNProductsList();
      },
      error => console.log(error)
    );
  }

  onProjectScopeSubmit() {
    this.projectSummary();
  }

  onMapProductsSubmit() {
    this.projectScopeForm.markAsDirty();
  }

  onMapAttributesSubmit() {
    this.projectScopeForm.markAsDirty();
  }

  onAction(action: any) {
    console.log(action);
  }

  projectSummary() {
    this.router.navigate(['/pages/project/projects/list']);
  }

  nextStepper(stepper: MatStepper, view: string) {
    stepper.next();
    switch(view) {
      case 'Project':
        this.initPopulateEmployeesListByProject();
        break;
      case 'RoleMap':
        this.initRequirementsNProductsList();
        break;
      case 'AssignReqNProd':
        this.projectSummary();
        break;
      default:
        console.log('No Matching...!');
    }
  }

}
