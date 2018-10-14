import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveSection } from '../models/hive-section';
import { HiveListItem } from '../models/hive-list-item';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveSection = new HiveSection(0, '', '', false);
  hiveId: number;
  existed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hiveSectionService: HiveSectionService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(r => {
      this.hiveId = r['hiveId'];
      if(r['id'] === undefined) return;
      this.hiveSectionService.getHiveSection(r['id']).subscribe(h => this.hiveSection = h);
      this.existed = true;
    });
  }

  navigateToHiveSections(){
    this.router.navigate([`/hive/${this.hiveId}/sections`]);
  }

  onCancel(){
    this.navigateToHiveSections();
  }

  onSubmit(){
    if(this.existed){
      this.hiveSectionService.updateHiveSection(this.hiveSection, this.hiveId).subscribe(h => this.navigateToHiveSections());
      }else{
        this.hiveSectionService.addHiveSection(this.hiveSection, this.hiveId).subscribe(h => this.navigateToHiveSections()); 
      }
  }

  onDelete(){
    this.hiveSectionService.deleteHiveSection(this.hiveSection.id).subscribe(d => this.navigateToHiveSections());
  }

  onUndelete(){
    this.hiveSectionService.setHiveSectionStatus(this.hiveSection.id, false).subscribe(d => this.navigateToHiveSections());
  }

  onPurge(){
    this.hiveSection = new HiveSection(0, '', '', false);
  }
}
