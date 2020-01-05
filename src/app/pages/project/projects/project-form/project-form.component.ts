import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AppConstants } from  '../../../../@core/utils/constants';
import { AppDataService, ApiService, LocalStorageService } from  '../../../../@core/utils';
import _ from 'lodash';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'ngx-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
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
  viewControl = {
    manageProject: false,
    employeeRoleMap: false,
    projectScope: false,
    mapProducts: false,
    mapAttributes: false
  }
  AttrValidation = {
    "Boolean": {
      "mandatory": [1, 0, 0, 0],
      "visibility": [1, 0, 0, 0],
      "placeholders": ["T/F", "", "", ""],
      "patterns": [/^(T|F|t|f)$/, null, null, null]
    },
    "Values": {
      "mandatory": [1, 0, 0, 0],
      "visibility": [1, 1, 0, 0],
      "placeholders": ["", "", "", ""],
      "patterns": [/(.\/)*/, /\w/, null, null]
    },
    "Date": {
      "mandatory": [1, 0, 0, 0],
      "visibility": [1, 1, 0, 0],
      "placeholders": ["", "", "", ""],
      "patterns": [/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/, /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/, null, null]
    },
    "KeyValue": {
      "mandatory": [1, 0, 0, 0],
      "visibility": [1, 0, 0, 0],
      "placeholders": ["", "", "", ""],
      "patterns": [null, null, null, null]
    },
    "Range": {
      "mandatory": [1, 1, 0, 0],
      "visibility": [1, 1, 1, 1],
      "placeholders": ["", "", "", ""],
      "patterns": [/^(\d)$/, /^(\d)$/, /^(\d)$/, /^(\d)$/]
    }
  };
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
      Project_Code: this.localStorageService.getValue('Project_Code'),
    };
    this.ApiService.populateProject(params).subscribe(
      (resp: any) => {
        if (resp.data && resp.data.length) {
          resp.data[0].Project_Plan_Start_Date = moment(resp.data[0].Project_Plan_Start_Date);
          resp.data[0].Project_Plan_End_Date = moment(resp.data[0].Project_Plan_End_Date);
          resp.data[0].Project_Actl_Start_Date = resp.data[0].Project_Actl_Start_Date ? moment(resp.data[0].Project_Actl_Start_Date) : '';
          resp.data[0].Project_Actl_End_Date = resp.data[0].Project_Actl_End_Date ? moment(resp.data[0].Project_Actl_End_Date) : '';
          this.manageProjectForm.patchValue(resp.data[0]);
          this.initProjectLevelListBySDLSMethod(resp.data[0].Sdlc_Method_Code);
          this.initParentProjectChange(resp.data[0].ParentProject_Code);
        }
      },
      error => console.log(error),
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
    } else {
      this.initProjectLevelListBySDLSMethod('HYBRID');
    }
  }

  // Init Manage Project Form Objs
  private initEmployeeRoleMap() {
    this.empRoleMapForm = this.fb.group({
      Project_Name: [{ value: this.localStorageService.getValue('Project_Name'), disabled: true }],
      Project_Code: [{ value: this.localStorageService.getValue('Project_Code'), disabled: true }],
      ProjectEmpRoleList: this.fb.array([]),
    });
  }

  // Init Manage Project Form Objs
  private initRequirementsNProducts() {
    this.projectScopeForm = this.fb.group({
      Project_Name: [{ value: this.localStorageService.getValue('Project_Name'), disabled: true }],
      Project_Code: [{ value: this.localStorageService.getValue('Project_Code'), disabled: true }],
    });
    const actionsListConfig = [
      { name: 'onMapProduct', title: '<i class="ion-link" title="Map Product"></i>' }
    ];
    if ( this.viewType !== 'View' ) {
      actionsListConfig.push({ name: 'onDelete', title: '<i class="nb-trash" title="Delete Mapped Requirement"></i>' });
    }
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
        custom: actionsListConfig,
        position: 'right',
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
        },
      },
    };
  }

  private initRequirementsNProductsList() {
    let params;
    let APIMethod;
    if (this.viewType === 'Create') {
      params = {
        Sdlc_Method_Code: this.localStorageService.getValue('Sdlc_Method_Code'),
      };
      APIMethod = this.ApiService.initialAssignReqNProducts(params);
    } else if (this.viewType === 'Edit') {
      params = {
        Project_Code: this.localStorageService.getValue('Project_Code'),
        Sdlc_Method_Code: this.localStorageService.getValue('Sdlc_Method_Code')
      };
      APIMethod = this.ApiService.populateAssignReqNProductsToEdit(params);
    } else {
      params = {
        Project_Code: this.localStorageService.getValue('Project_Code')
      };
      APIMethod = this.ApiService.populateAssignReqNProductsToView(params);
    }
    APIMethod.subscribe(
      (resp: any) => {
        this.requirementsNProductsData = _.map(resp.data, (data: any) => {
          let splitProdByComma = data.Product.split(",");
          data.Product = _.map(splitProdByComma, (product: string) => {
            return {
              Prod_Code: product.split(':')[0],
              Prod_Name: product.split(':')[1],
              Func_Code: data.func_code,
              DetRequirement_Name: data.DetRequirement_Name,
              DetRequirement_Code: data.DetRequirement_Code,
              DetRequirement_Version: data.DetRequirement_Version
            };
          });
          return data;
        });
      },
      error => console.log(error),
    );
  }

  // Init Manage Project Form Objs
  private initMapProducts() {
    this.mapProductsForm = this.fb.group({
      Project_Name: [{ value: this.localStorageService.getValue('Project_Name'), disabled: true }],
      Project_Code: [{ value: this.localStorageService.getValue('Project_Code'), disabled: true }],
      DetRequirement_Name: [{ value: this.localStorageService.getValue('DetRequirement_Name'), disabled: true }],
    });
    this.mapProductSettings = {
      title: 'Map Products',
      editable: false,
      hideSubHeader: true,
      actions: {
        add: false,
        edit: false,
        delete: false,
        class: 'custom-column',
        custom: [
          { name: 'onMapAttribute', title: '<i class="ion-link" title="Map Attribute"></i>' },
        ],
        position: 'right',
      },
      columns: {
        Prod_Code: {
          title: 'Product Code',
          type: 'number',
        },
        Prod_Name: {
          title: 'Product Name',
          type: 'string',
        }
      },
    };
  }

  // Init Manage Project Form Objs
  private initMapAttributes() {
    this.mapAttributesForm = this.fb.group({
      Project_Name: [{ value: this.localStorageService.getValue('Project_Name'), disabled: true }],
      Project_Code: [{ value: this.localStorageService.getValue('Project_Code'), disabled: true }],
      DetRequirement_Name: [{ value: this.localStorageService.getValue('DetRequirement_Name'), disabled: true }],
      Prod_Name: [{ value: this.localStorageService.getValue('Prod_Name'), disabled: true }],
      MapProductAttributesList: this.fb.array([]),
    });
  }

  getEmployeeDetailsById(empCode: string) {
    return _.find(this.employeesList, ['emp_Code', empCode]);
  }

  getRoleDetailsById(rCode: string) {
    return _.find(this.rolesList, ['Role_Code', rCode]);
  }

  private employeesRoleMap(isEnabled: boolean) {
    const form = this.fb.group({
      Role_Code: [{ value: '', disabled: this.viewType === 'view' || isEnabled }, Validators.compose([Validators.required])],
      Employee_Code: [{ value: '', disabled: this.viewType === 'view' || isEnabled }, Validators.compose([Validators.required])],
      BV_Code: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      BV_Name: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      Responsibilities: [{ value: '', disabled: true }],
      Signoff_Ind: [{ value: '', disable: this.viewType === 'view' || isEnabled}],
      Signoff_Ind_Original: [{ value: '' }, Validators.compose([Validators.required])],
      Is_Associated: [{ value: false, disable: this.viewType === 'view' || isEnabled }],
    });
    form.get('Employee_Code').valueChanges.subscribe(value => {
      const data = this.getEmployeeDetailsById(value);
      form.get('BV_Code').setValue(data.bv_Code);
      form.get('BV_Name').setValue(data.bv_Name);
    });
    form.get('Role_Code').valueChanges.subscribe(value => {
      const data = this.getRoleDetailsById(value);
      form.get('Responsibilities').setValue(data.Role_Responsibilities);
    });
    if (this.viewType === 'view') {
      form.disable();
    }
    return form;
  }

  addEmployeeNRoles() {
    const control = <FormArray>this.empRoleMapForm.controls['ProjectEmpRoleList'];
    const addCtrl = this.employeesRoleMap(false);
    control.push(addCtrl);
  }

  removeEmployeeNRoles(recordIndex: number, formControl: any) {
    const control = <FormArray>this.empRoleMapForm.controls['ProjectEmpRoleList'];
    const formControlRawValue = formControl.getRawValue();
    if (formControlRawValue.Is_Associated) {
      if (confirm('Are you Sure?')) {
        let params = {
          Employee_Code: formControlRawValue.Employee_Code,
          Role_Code: formControlRawValue.Role_Code,
          BV_Code: formControlRawValue.BV_Code
        };
        if ( this.viewType === 'Edit' ) {
          params = _.merge(params, { Project_Code: this.localStorageService.getValue('Project_Code') });
        }
        this.ApiService.deAssociateEmployeeRoleFromProject(params).subscribe(
          (resp: any) => {
            control.removeAt(recordIndex);
          },
          error => console.log(error),
        );
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
        User_id: null,
      };
      APIMethod = this.ApiService.initialEmployeesByProject(params);
    } else {
      params = {
        Project_Code: this.localStorageService.getValue('Project_Code'),
        IsActive: 'A',
      };
      APIMethod = this.ApiService.rolesNResponsibilitiesListByProject(params);
    }
    APIMethod.subscribe(
      (resp: any) => {
        resp.data = _.map(resp.data, (data: any) => {
          data.Is_Associated = true;
          return data;
        });
        this.empRoleMapForm.controls['ProjectEmpRoleList'] = this.fb.array([]);
        _.each(resp.data, (data: any) => {
          control = <FormArray>this.empRoleMapForm.controls['ProjectEmpRoleList'];
          ctrl = this.employeesRoleMap(true);
          ctrl.patchValue(data);
          control.push(ctrl);
        });
      },
      error => console.log(error),
    );
  }

  //Product Attributes Map
  mapProductAttributesForm() {
    let form = this.fb.group({
      'Attribute_Operation_Required': [{ value: null, disabled: true }, Validators.required],
      'Attribute_Name': [{ value: null, disabled: true }, Validators.required],
      'Attribute_Code': [{ value: null, disabled: true }, Validators.required],
      'Attribute_Value_Type': [{ value: null, disabled: this.viewType === 'view' }, Validators.required],
      'Attribute_Value1': [{ value: null, disabled: this.viewType === 'view' }, Validators.required],
      'Attribute_Value2': [{ value: null, disabled: this.viewType === 'view' }],
      'Attribute_Value3': [{ value: null, disabled: this.viewType === 'view' }],
      'Attribute_Value4': [{ value: null, disabled: this.viewType === 'view' }],
      'Attribute_Weight': [{ value: null, disabled: this.viewType === 'view' }, Validators.required],
      'Is_Valid': [{ value: null, disabled: this.viewType === 'view' }, Validators.required]
    });
    // form.get('Attribute_Value_Type').valueChanges.subscribe(data => {
    //   this.AttributeValidation(data);
    // })
    return form;
  }

  private initPopulateMapProductAttrByProject(stepper: MatStepper, isCreate: boolean) {
    let params;
    let APIMethod;
    if (this.viewType === 'Create' || isCreate) {
      params = {
        Func_Code: this.localStorageService.getValue('Func_Code'),
        Prod_Code: this.localStorageService.getValue('Prod_Code'),
        IsActive: 'A',
      };
      APIMethod = this.ApiService.initialPopulateMapProductAttrByProject(params);
    } else {
      params = {
        detRequirement_Code: this.localStorageService.getValue('DetRequirement_Code'),
        project_Code: this.localStorageService.getValue('Project_Code'),
        product_Code: this.localStorageService.getValue('Prod_Code'),
        detRequirement_Versio: this.localStorageService.getValue('DetRequirement_Version'),
        isActive: 'A',
      };
      APIMethod = this.ApiService.populateProjectDetail(params);
    }
    APIMethod.subscribe(
      (resp: any) => {
        if ( resp.data && resp.data.length) {
          resp.data = _.map(resp.data, (data: any) => {
            data.Is_Associated = true;
            return data;
          });
          this.mapAttributesForm.controls['MapProductAttributesList'] = this.fb.array([]);
          this.initMapProductAttrDetail(resp.data[0].Attribute_Code, resp.data);
          this.viewControl.mapProducts = true;
          this.nextStepper(stepper, 'mapAttributes');
        } else if ( resp.data && !resp.data.length && this.viewType !== 'Create') {
          this.initPopulateMapProductAttrByProject(stepper, true);
        } else {
          alert('Attributes are not mapped for the Product');
        }
      },
      error => console.log(error),
    );
  }

  disableListOptions(optionsValue: string) {
    return optionsValue === '400' || optionsValue === '500' ? true : false;
  }

  initProjectLevelListBySDLSMethod(value: string) {
    const params = {
      KeyValue_Type_Cd: value,
      KeyValue_Lang_Cd: 'E',
    };
    this.ApiService.keyValueMap(params).subscribe(
      (resp: any) => {
        this.projectLevelList = resp.data;
        this.manageProjectForm.patchValue({
          Project_Level_code: resp.data.length ? resp.data[0].KeyValue_Val_Cd : '',
        });
      },
      error => console.log(error),
    );
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
      ParentProject_Status: projectStatusValue.KeyValue_Desc,
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
    // Date Format Coversion
    data.Project_Plan_Start_Date = data.Project_Plan_Start_Date.format('YYYY-MM-DD');
    data.Project_Plan_End_Date = data.Project_Plan_End_Date.format('YYYY-MM-DD');
    data.Project_Actl_Start_Date = data.Project_Actl_Start_Date ? data.Project_Actl_Start_Date.format('YYYY-MM-DD') : 'NaN-NaN-NaN';
    data.Project_Actl_End_Date = data.Project_Actl_End_Date ? data.Project_Actl_End_Date.format('YYYY-MM-DD') : 'NaN-NaN-NaN';
    return data;
  }
  initSaveOrUpdate(data: any, stepper: MatStepper) {
    let APIMethod;
    // Check Form Validation and move forward
    if (this.manageProjectForm.invalid) {
      return;
    }
    data = this.preProcessPostData(data);
    data.ReviewedBy = data.ReviewedBy.toString();
    if ( this.viewType === 'Create' ) {
      APIMethod = this.ApiService.saveProject(data);
    } else {
      data.Project_Code = this.localStorageService.getValue('Project_Code');
      APIMethod = this.ApiService.updateProject(data);
    }
    APIMethod.subscribe(
      (resp: any) => {
        if ( this.viewType === 'Create' ) {
          this.localStorageService.setValues({
            Project_Name: data.Project_Name,
            Sdlc_Method_Code: data.Sdlc_Method_Code,
            Project_Code: resp.data,
          });
        }
        stepper.next();
        this.viewControl.manageProject = true;
        this.initPopulateEmployeesListByProject();
      },
      error => console.log(error),
    );
  }

  onEmployeeRoleMapSubmit(data: any, stepper: MatStepper) {
    // Check Form Validation and move forward
    if (this.empRoleMapForm.invalid) {
      return;
    }
    const proEmpRoleList = _.map(data.controls.ProjectEmpRoleList.getRawValue(), (record: any) => {
      record.Signoff_Ind = !record.Signoff_Ind ? 'N' : 'Y';
      record.Project_Code = this.localStorageService.getValue('Project_Code');
      return _.pick(record, ['Role_Code', 'Employee_Code', 'BV_Code', 'BV_Name', 'Responsibilities', 'Signoff_Ind', 'Project_Code']);
    });
    this.ApiService.saveOrUpdateEmpRoleMapByProject(proEmpRoleList).subscribe(
      (resp: any) => {
        stepper.next();
        this.viewControl.employeeRoleMap = true;
        this.initRequirementsNProductsList();
      },
      error => console.log(error),
    );
  }

  initMapProductAttrDetail(attr_code: any, proAttrList: any) {
    let control: any;
    let ctrl: any;
    const params = {
      Attribute_Code: attr_code,
      IsActive: 'A'
    }
    this.ApiService.populateMapProductAttrDetail(params).subscribe(
      (resp: any) => {
        _.each(proAttrList, (data: any) => {
          control = <FormArray>this.mapAttributesForm.controls['MapProductAttributesList'];
          ctrl = this.mapProductAttributesForm();
          data.Attribute_Name = resp.data[0].Attribute_Name;
          data.Attribute_Code = resp.data[0].Attribute_Code;
          ctrl.patchValue(data);
          control.push(ctrl);
        });
      },
      error => console.log(error),
    );
  }

  onMapAttributesSubmit(data: any, stepper: MatStepper) {
    // Check Form Validation and move forward
    if (this.mapAttributesForm.invalid) {
      return;
    }
    const defaultVals = {
      "Project_Code": this.localStorageService.getValue('Project_Code'),
      "DetRequirement_Code": this.localStorageService.getValue('DetRequirement_Code'),
      "DetRequirement_Version": this.localStorageService.getValue('DetRequirement_Version') || '1',
      "Product_Code": this.localStorageService.getValue('Prod_Code'),
      "Mandatory_Prod_Ind": "Y",
      "Scen_Type_Code": "P",
      "Scen_Priority_Code": "H"
    };
    let postData = data.controls.MapProductAttributesList.getRawValue()[0];
    postData.Attribute_Operation_Required = 'add';
    postData = _.chain(postData).omit(['Is_Valid']).merge(defaultVals).value();
    postData.Attribute_Weight = postData.Attribute_Weight.toString();
    this.ApiService.saveProjectDetail(postData).subscribe(
      (resp: any) => {
        stepper.previous();
      },
      error => console.log(error),
    );
  }

  onProjectScopeSubmit() {
    this.projectSummary();
  }

  onAction(action: any) {
    console.log(action);
  }

  onActionMapProduct(stepper: MatStepper, action: any) {
    this.localStorageService.setValues({
      DetRequirement_Code: action.data.DetRequirement_Code,
      DetRequirement_Name: action.data.DetRequirement_Name,
      DetRequirement_Version: action.data.DetRequirement_Version
    });
    this.mapProductData = action.data.Product;
    this.viewControl.projectScope = true;
    this.nextStepper(stepper, 'mapProducts');
  }

  onActionMapAttribute(stepper: MatStepper, action: any) {
    this.localStorageService.setValues({
      Prod_Code: action.data.Prod_Code,
      Prod_Name: action.data.Prod_Name,
      Func_Code: action.data.Func_Code,
      DetRequirement_Code: action.data.DetRequirement_Code,
      DetRequirement_Name: action.data.DetRequirement_Name,
      DetRequirement_Version: action.data.DetRequirement_Version
    });
    this.initPopulateMapProductAttrByProject(stepper, false);
  }

  projectSummary() {
    this.router.navigate(['/pages/project/projects/list']);
  }

  prevStepper(stepper: MatStepper, view: string) {
    stepper.previous();
    switch (view) {
      case 'projectScope':
        this.initRequirementsNProductsList();
        break;
      case 'mapProducts':
        this.initRequirementsNProductsList();
        break;
      default:
        console.log('No Matching...!');
    }
  }

  nextStepper(stepper: MatStepper, view: string) {
    stepper.next();
    this.viewControl[view] = true;
    switch (view) {
      case 'manageProject':
        this.initPopulateEmployeesListByProject();
        break;
      case 'employeeRoleMap':
        this.initRequirementsNProductsList();
        break;
      case 'projectScope':
        this.projectSummary();
        break;
      case 'mapProducts':
        this.mapProductsForm.patchValue({
          Project_Name: this.localStorageService.getValue('Project_Name'),
          Project_Code: this.localStorageService.getValue('Project_Code'),
          DetRequirement_Name: this.localStorageService.getValue('DetRequirement_Name'),
        });
        break;
      case 'mapAttributes':
        this.mapAttributesForm.patchValue({
          Project_Name: this.localStorageService.getValue('Project_Name'),
          Project_Code: this.localStorageService.getValue('Project_Code'),
          DetRequirement_Name: this.localStorageService.getValue('DetRequirement_Name'),
          Prod_Name: this.localStorageService.getValue('Prod_Name')
        });
        break;
      default:
        console.log('No Matching...!');
    }
  }

}
