import { Component, AfterViewInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import FilerobotImageEditor from 'filerobot-image-editor';
import { FilerobotImageEditorConfig, TABS, TOOLS } from 'react-filerobot-image-editor';

@Component({
  selector: 'app-create-new-post',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.css'
})
export class CreateNewPostComponent {
  //file that wil be edited
  file: File | null = null;
  fileUrl!: string; 
  
  constructor(private router: Router,public imgService : ImagesService,){}

  ngOnInit(){
    this. file = this.imgService.getFile();
    if(this.file){
    this.fileUrl= URL.createObjectURL(this.file as File);
    }
    else{
      this.router.navigate(['/new-post']);
    }

    const container = document.getElementById('editor-container');
    const filerobotImageEditor = new FilerobotImageEditor(container as HTMLElement, {
      source: this.fileUrl, // You can provide an image URL here
      //source: "https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg",
      //tools: ['adjust', 'effects', 'filters', 'resize', 'crop', 'rotate'],
        
      annotationsCommon: {
        fill: '#ff0000',
      },
      Text: { text: 'Text' },
      Rotate: { angle: 90, componentType: 'slider' },
      /*translations: {
        profile: 'Profile',
        coverPhoto: 'Cover photo',
        facebook: 'Facebook',
        socialMedia: 'Social Media',
       // fbProfileSize: '180x180px',
       // fbCoverPhotoSize: '820x312px',
        
      },
      Crop: {
        presetsItems: [
          {
            titleKey: 'classicTv',
            descriptionKey: '4:3',
            ratio: 4 / 3,
            // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
          },
          {
            titleKey: 'cinemascope',
            descriptionKey: '21:9',
            ratio: 21 / 9,
            // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
          },
        ],
        presetsFolders: [
          {
            titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
            // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
            groups: [
              {
                titleKey: 'facebook',
                items: [
                  {
                    titleKey: 'profile',
                    width: 180,
                    height: 180,
                    descriptionKey: 'fbProfileSize',
                  },
                  {
                    titleKey: 'coverPhoto',
                    width: 820,
                    height: 312,
                    descriptionKey: 'fbCoverPhotoSize',
                  },
                ],
              },
            ],
          },
        ],
      },*/
      tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.FINETUNE, TABS.FILTERS ] as string[], // or ['Adjust', 'Annotate', 'Watermark']
      defaultTabId: TABS.ADJUST, // or 'Annotate'
      //defaultToolId: TOOLS.TEXT,
  
    } as FilerobotImageEditorConfig);

    filerobotImageEditor.render();
  }

  

}

  
   

