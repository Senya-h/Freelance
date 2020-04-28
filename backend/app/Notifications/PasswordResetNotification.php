<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class PasswordResetNotification extends Notification
{
    use Queueable;
    public $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = 'http://localhost:3000/password/reset/?token='.$this->token;
        return (new MailMessage)
                    ->subject(Lang::get('Workify slaptažodžio priminimas'))
                    ->line(Lang::get('Gavote šį laišką, nes gavome užklausą jog pamiršote slaptažodį.'))
                    ->action(Lang::get('Priminti slaptažodį'), $url)
                    ->line(Lang::get('Šis link nebegalios po in :count minučių.', ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]))
                    ->line(Lang::get('Jeigu nenorite atnaujinti savo slaptažodžio ignoruokite šį laišką'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
