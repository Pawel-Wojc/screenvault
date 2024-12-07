import { Component, inject } from '@angular/core';
import { Router} from '@angular/router';
import { ImagesService } from '../services/images.service';
import FilerobotImageEditor from 'filerobot-image-editor';
import { FilerobotImageEditorConfig, TABS } from 'react-filerobot-image-editor';

@Component({
  selector: 'app-edit-image',
  standalone: true,
  imports: [],
  templateUrl: './edit-image.component.html',
  styleUrl: './edit-image.component.css'
})
export class CreateNewPostComponent {
  private router =  inject(Router)
  private imgService = inject(ImagesService)
 
  //file that wil be edited
  file: File | null = null;
  fileUrl!: string | null; 

  ngOnInit(){
    
    this.file = this.imgService.getFile();
    if(this.file){
      this.fileUrl= URL.createObjectURL(this.file as File);
    }
    else{
      this.router.navigate(['/upload-image']);
    }

    const container = document.getElementById('editor-container');
    const filerobotImageEditor = new FilerobotImageEditor(container as HTMLElement, {
      source: this.fileUrl, // You can provide an image URL here
      //source: "https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg",
      onSave: async (editedImageObject, designState) =>{
         this.imgService.clearFile();
         
         await this.extractEditedFile(editedImageObject.imageBase64 as string, editedImageObject.fullName as string);

         this.imgService.setFile(this.file);

         this.router.navigate(['/public-post']);
      },
      annotationsCommon: {
        fill: '#ff0000',
      },
      defaultSavedImageName: this.file?.name, 
      defaultSavedImageQuality: 1,
      defaultSavedImageType: this.file?.type,
      closeAfterSave: true,
      showBackButton: false,
      Text: { text: 'Text' },
      Rotate: { angle: 90, componentType: 'slider' },
      tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.FINETUNE, TABS.FILTERS ] as string[], 
      defaultTabId: TABS.ADJUST, 
  
    } as FilerobotImageEditorConfig);

    filerobotImageEditor.render({
      onClose: (closingReason: any) => {
        filerobotImageEditor.terminate();   
      },
    } as any );
  }

  async extractEditedFile(url: string, filename: string) {
    try{
      const response = await fetch(url);
      const blob = await response.blob();

      this.file = new File([blob], filename); 
    }
    catch(error) {
        console.log(error);
    }
  }
}