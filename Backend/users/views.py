from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


# REGISTER
@api_view(['POST'])
def register_user(request):

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "User created"
        })

    return Response(serializer.errors)


# LOGIN
@api_view(['POST'])
def login_user(request):

    email = request.data.get("email")

    password = request.data.get("password")

    user = User.objects.filter(
        email=email,
        password=password
    ).first()

    if user:

        return Response(
            UserSerializer(user).data
        )

    return Response({
        "error": "Invalid credentials"
    })


# GET USERS
@api_view(['GET'])
def get_users(request):

    users = User.objects.all()

    serializer = UserSerializer(
        users,
        many=True
    )

    return Response(serializer.data)


# DELETE USER
@api_view(['DELETE'])
def delete_user(request, id):

    try:

        user = User.objects.get(id=id)

        user.delete()

        return Response({
            "message": "User Deleted"
        })

    except User.DoesNotExist:

        return Response({
            "error": "User not found"
        })


# UPDATE USER
@api_view(['PUT'])
def update_user(request, id):

    try:

        user = User.objects.get(id=id)

    except User.DoesNotExist:

        return Response(
            {
                "error": "User not found"
            },
            status=404
        )

    serializer = UserSerializer(
        user,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )