import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EPublished } from 'src/models/case.model';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}


    SendNotification(email:string,entity_name:string,verdict:EPublished): void {

      enum entity {

      }


        this.mailerService
          .sendMail({
            to: `${email}`, // list of receivers
            from: 'project.oop@mail.ru', // sender address
            subject: 'Подтверждение почты ✔', // Subject line
            html:
            `<table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0; border-collapse: collapse;">
            <tr>
            <td style="border: 1px solid #000; text-align: center; font-size: 20px; font-weight: 600;">Уведомление о публикации</td>
            </tr>
            <tr>
            <td style="border: 1px solid #000;">${entity_name}</td>
            </tr>
            <tr>
            <td style="border: 1px solid #000; text-align: center; font-size: 16px; font-weight: 600;">Your ${entity_name} already have verdict: ${verdict}</td>
            </tr>
            </table>`, // HTML body content
          })
          .then(() => {         
          })
          .catch((e) => {
            console.log(e);
            
            throw new HttpException('Ошибка отправления сообщения',HttpStatus.BAD_REQUEST)
          });
      }
}
