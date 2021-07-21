from django.dispatch import receiver
from django.template.loader import get_template

from pretix.presale.signals import html_head


@receiver(html_head, dispatch_uid="pretix_signature_question_html_head")
def html_head_presale(sender, request=None, **kwargs):
    template = get_template('pretix_signature_question/presale_head.html')
    ctx = {}
    return template.render(ctx)
