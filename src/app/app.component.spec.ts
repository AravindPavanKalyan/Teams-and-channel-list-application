import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {TeamList} from './teamList/teamList.component';
import {Team} from './team/team.component';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;
  let addTeamBtn;
  let addChannelBtn1;
  let addChannelBtn2;
  let teamNameInput;
  let channelNameInput2;
  let removeChnlBtn1;
  let removeChnlBtn2;
  let removeChnlBtn3;
  let removeChnlBtn4;
  let channelList1;
  let channelList2;
  let teamList;
  let channelNameInput1;

  const TEST_IDS = {
    addTeamBtnId: 'add-team-btn',
    addChannelBtnPrefix: 'add-channel-btn-',
    teamNameInputId: 'team-name-input',
    channelNameInputPrefix: 'channel-name-input-',
    removeChnlBtnPrefix: 'remove-channel-button-',
    chnlListPrefix: 'channel-list-',
    teamListId: 'team-list'
  }

  const getByTestId = (id, parentNode?) => {
    if (!parentNode) {
      parentNode = compiled;
    }
    return parentNode.querySelector(`[data-test-id="${id}"]`);
  };

  const pushValueToInput = async (input, value) => {
    input.value = value;
    input.dispatchEvent(new Event('change'));
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    await fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        TeamList,
        Team
      ],
      providers: [],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    await fixture.detectChanges();
    await fixture.whenStable();

    teamNameInput = getByTestId(TEST_IDS.teamNameInputId);
    addTeamBtn = getByTestId(TEST_IDS.addTeamBtnId);
    teamList = getByTestId(TEST_IDS.teamListId);

    channelNameInput1 = getByTestId(TEST_IDS.channelNameInputPrefix + '0');
    addChannelBtn1 = getByTestId(TEST_IDS.addChannelBtnPrefix + '0');
    channelList1 = getByTestId(TEST_IDS.chnlListPrefix + '0');
    removeChnlBtn1 = getByTestId(TEST_IDS.removeChnlBtnPrefix + '00');
    removeChnlBtn2 = getByTestId(TEST_IDS.removeChnlBtnPrefix + '01');

    channelNameInput2 = getByTestId(TEST_IDS.channelNameInputPrefix + '1');
    addChannelBtn2 = getByTestId(TEST_IDS.addChannelBtnPrefix + '1');
    channelList2 = getByTestId(TEST_IDS.chnlListPrefix + '1');
    removeChnlBtn3 = getByTestId(TEST_IDS.removeChnlBtnPrefix + '10');
    removeChnlBtn4 = getByTestId(TEST_IDS.removeChnlBtnPrefix + '11');
  });

  it('Initial teams and channels as rendered as required and add team and add channel buttons should be disabled initially', () => {
    expect(teamNameInput.value.trim()).toBeFalsy();
    expect(addTeamBtn.disabled).toBeTruthy();

    expect(teamList.children.length).toEqual(2);
    expect(teamList.children[0].textContent).toContain('Team1');
    expect(teamList.children[1].textContent).toContain('Team2');

    expect(addChannelBtn1.disabled).toBeTruthy();
    expect(channelNameInput1.value.trim()).toBeFalsy();
    expect(channelList1.children.length).toEqual(2)
    expect(channelList1.children[0].textContent).toContain('Channel1');
    expect(removeChnlBtn1).toBeTruthy();
    expect(channelList1.children[1].textContent).toContain('Channel2');
    expect(removeChnlBtn2).toBeTruthy();

    expect(addChannelBtn2.disabled).toBeTruthy();
    expect(channelNameInput2.value.trim()).toBeFalsy();
    expect(channelList2.children.length).toEqual(2)
    expect(channelList2.children[0].textContent).toContain('Channel1');
    expect(removeChnlBtn3).toBeTruthy();
    expect(channelList2.children[1].textContent).toContain('Channel2');
    expect(removeChnlBtn4).toBeTruthy();
  });

  it('add team button should be enabled only if data entered in input is correct and clicking on button should add it to the list of teams', async () => {
    await pushValueToInput(teamNameInput, 'Team3');

    addTeamBtn = getByTestId(TEST_IDS.addTeamBtnId);
    expect(addTeamBtn.disabled).toBeFalsy();

    await addTeamBtn.click();

    teamList = getByTestId(TEST_IDS.teamListId);
    expect(teamList.children.length).toEqual(3)
    expect(teamList.children[2].textContent).toContain('Team3');
  });

  it('add team button should be disabled if data entered in input is empty or team name already exists', async () => {
    await pushValueToInput(teamNameInput, 'Team3');

    addTeamBtn = getByTestId(TEST_IDS.addTeamBtnId);
    expect(addTeamBtn.disabled).toBeFalsy();

    await pushValueToInput(teamNameInput, '');

    addTeamBtn = getByTestId(TEST_IDS.addTeamBtnId);
    expect(addTeamBtn.disabled).toBeTruthy();

    await pushValueToInput(teamNameInput, 'Team2');

    addTeamBtn = getByTestId(TEST_IDS.addTeamBtnId);
    expect(addTeamBtn.disabled).toBeTruthy();
  });

  it('add channel button should be enabled only if data entered in input is correct and clicking on button should add it to the list of channels', async () => {
    await pushValueToInput(channelNameInput2, 'Channel3');

    addChannelBtn2 = getByTestId(TEST_IDS.addChannelBtnPrefix + '1');
    expect(addChannelBtn2.disabled).toBeFalsy();

    await addChannelBtn2.click();

    channelList2 = getByTestId(TEST_IDS.chnlListPrefix + '1');
    expect(channelList2.children.length).toEqual(3);
    expect(channelList2.children[2].textContent).toContain('Channel3')
  });

  it('add channel button should be disabled if data entered in input is empty or channel name already exists', async () => {
    await pushValueToInput(channelNameInput2, 'Channel3');

    addChannelBtn2 = getByTestId(TEST_IDS.addChannelBtnPrefix + '1');
    expect(addChannelBtn2.disabled).toBeFalsy();

    await pushValueToInput(channelNameInput2, '');

    addChannelBtn2 = getByTestId(TEST_IDS.addChannelBtnPrefix + '1');
    expect(addChannelBtn2.disabled).toBeTruthy();

    await pushValueToInput(channelNameInput2, 'Channel1');

    addChannelBtn2 = getByTestId(TEST_IDS.addChannelBtnPrefix + '1');
    expect(addChannelBtn2.disabled).toBeTruthy();
  });

  it('clicking on the remove button should remove the channel from the list', async () => {
    await removeChnlBtn3.click();

    channelList2 = getByTestId(TEST_IDS.chnlListPrefix + '1');
    expect(channelList2.children.length).toEqual(1);
    expect(channelList2.children[0].textContent).toContain('Channel2');

    removeChnlBtn3 = getByTestId(TEST_IDS.removeChnlBtnPrefix + '10');
    await removeChnlBtn3.click();

    channelList2 = getByTestId(TEST_IDS.chnlListPrefix + '1');
    expect(channelList2.children.length).toEqual(0);
  })
});
